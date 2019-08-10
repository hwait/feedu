const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const axios = require('axios');
const url = 'https://api.telegram.org/bot';
const User = require('../../models/User');
const Schedule = require('../../models/Schedule');
const Lesson = require('../../models/Lesson');
const Course = require('../../models/Course');
const Book = require('../../models/Book');

const moment = require('moment');
moment.locale('ru');
const getSchedule = require('./getSchedule');
const getDetailedSchedule = require('./getDetailedSchedule');

// @route   GET bot/
// @desc    Schedules bot
// @access  Public
router.post('/', (req, res) => {
	const message = req.body.message;
	//let uid = '5c84ae30078bcd02fcc0181f';
	let uid = '';
	if (message) {
		const from = message.from.id;
		User.findOne({ tid: from }) //
			.then((user) => {
				uid = user._id;
				processMessage(res, message, uid);
			})
			.catch((errors) => {
				console.log('====================================');
				console.log(errors);
				console.log('====================================');
			});
	} else {
		res.status(200).send({});
	}
});
const processMessage = (res, message, uid) => {
	const chatId = message.chat.id;
	console.log(uid);
	const text = message.text;
	const { botKey } = keys;
	if (text.match(/start/gi)) {
		axios
			.post(`${url}${botKey}/sendMessage`, {
				chat_id: chatId,
				text: 'Bot started!!!',
				reply_markup: {
					keyboard: [
						[ { text: 'Current week' }, { text: 'Next week' } ],
						[ { text: 'Today' }, { text: 'Tomorrow' } ]
					]
				}
			})
			.then((response) => {
				res.status(200).send(response);
			})
			.catch((error) => {
				res.send(error);
			});
	} else if (text.match(/cw/gi) || text.match(/Current week/gi) || text.match(/nw/gi) || text.match(/Next week/gi)) {
		const current = text.match(/cw/gi) || text.match(/Current week/gi);
		ds = current ? moment().startOf('week') : moment().add(7, 'd').startOf('week');
		de = current ? moment().endOf('week') : moment().add(7, 'd').endOf('week');
		Schedule.find({ student: uid, ts: { $gte: ds, $lte: de } }) //
			.populate({
				path: 'course',
				model: Course,
				select: 'name sname'
			})
			.sort({ ts: 1 })
			.then((schedules) => {
				let txt = `*РАСПИСАНИЕ НА ${current ? 'ТЕКУЩУЮ' : 'СЛЕДУЮЩУЮ'} НЕДЕЛЮ*\n`;
				let i = 1;
				let curdate = '';
				schedules.forEach((schedule) => {
					const { ts, dur, course } = schedule;
					const from = moment(ts);
					const datex = from.format('MMM DD, dddd');
					if (datex !== curdate) {
						txt += `====================\n| *${datex}* |\n====================\n`;
						curdate = datex;
						i = 1;
					}
					txt += `${from.format('HH:mm')}-${from.add(dur, 'm').format('HH:mm')} Урок ${i}. ${course.sname}\n`;
					i++;
				});
				botSend(res, chatId, txt);
			})
			.catch(() => botSend(res, chatId, 'Ошибка!'));
		//.catch((errors) => errors);
	} else {
		const current = text.match(/cd/gi) || text.match(/Today/gi);
		ds = current ? moment().startOf('day') : moment().add(1, 'd').startOf('day');
		de = current ? moment().endOf('day') : moment().add(1, 'd').endOf('day');
		Schedule.find({ student: uid, ts: { $gte: ds, $lte: de } }) //
			.populate({
				path: 'lesson',
				model: Lesson,
				select: 'name nmb tasks link videos papers',
				populate: [
					{
						path: 'papers.book',
						model: Book,
						select: 'name author year'
					},
					{
						path: 'course',
						model: Course,
						select: 'name sname subjects'
					}
				]
			})
			.sort({ ts: 1 })
			.then((schedules) => {
				let txt = `====================\n|*${ds.format('MMM DD, dddd')}* |\n====================\n`;
				let i = 1;
				schedules.forEach((schedule) => {
					const { lesson, ts, dur } = schedule;
					const { name, nmb, papers, tasks, videos, course } = lesson;
					const from = moment(ts);
					txt += `=====================================================\n*${from.format('HH:mm')}-${from
						.add(dur, 'm')
						.format('HH:mm')} Урок ${i}. ${course.sname}*\n*${nmb}. ${name}*\n`;

					if (papers.length > 0) {
						txt += '_Читать:_\n';
						papers.forEach((paper) => {
							txt += `*§ ${paper.paragraph}* ${paper.book.author}// ${paper.book.name}, ${paper.book
								.year}\n`;
						});
					}
					if (videos.length > 0) {
						txt += '_Смотреть:_\n';
						videos.forEach((video) => {
							txt += `► [${video.dur} мин.] [inline URL](${video.link})\n`;
						});
					}
					if (tasks.length > 0) {
						txt += '_Решать:_\n';
						tasks.forEach((task) => {
							txt += `*℗ ${task.nmb}* ${task.book.author}// ${task.book.name}, ${task.book.year}\n`;
						});
					}
					i++;
				});
				botSend(res, chatId, txt);
			})
			.catch(() => botSend(res, chatId, 'Ошибка!'));
		//.catch((errors) => errors);
	}
	// if (text.match(/cd/gi) || text.match(/Today/gi)) {
	// 	botSend(chatId, 'getDetailedSchedule Today');
	// } else if (text.match(/nd/gi) || text.match(/Tomorrow/gi)) {
	// 	const t = getDetailedSchedule(from, false);
	// 	botSend(chatId, t);
	// }
};
const botSend = (res, chat_id, text) => {
	const { botKey } = keys;
	axios
		.post(`${url}${botKey}/sendMessage`, {
			chat_id,
			parse_mode: 'Markdown',
			text
		})
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.send(error);
		});
};
module.exports = router;
