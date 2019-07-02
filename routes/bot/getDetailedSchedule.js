const Schedule = require('../../models/Schedule');
const Lesson = require('../../models/Lesson');
const Course = require('../../models/Course');
const Book = require('../../models/Book');
const moment = require('moment');
moment.locale('ru');

const getDetailedSchedule = (user, current) => {
	const uid = '5c84ae30078bcd02fcc0181f';
	ds = current ? moment().startOf('day') : moment().add(2, 'd').startOf('day');
	de = current ? moment().endOf('day') : moment().add(2, 'd').endOf('day');
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
		.then((schedules) => {
			let res = `*${ds.format('MMM DD')}*`;
			res += '====================';

			schedules.forEach((schedule) => {
				const { lesson, ts, dur } = schedule;
				const { name, nmb, papers, tasks, videos, course } = lesson;
				const from = moment(ts);
				res += `${from.format('HH:mm')} ${course.sname}`;
				res += `${nmb}. ${name}`;
			});
			console.log('====================================');
			console.log(schedules, res);
			console.log('====================================');
			return res;
		})
		.catch((errors) => errors);
};
// items.forEach((schedule) => {
// 	const { lesson, ts, dur } = schedule;
// 	const from = moment(ts);
// 	const { name, nmb, papers, tasks, videos, course } = lesson;
// 	if (lc !== course.name) doc.createParagraph(`${course.name}`).heading2();
// 	lc = course.name;
// 	doc
// 		.createParagraph(`${n + 1}. ${from.format('HH:mm')}-${from.add(dur, 'm').format('HH:mm')} №${nmb} ${name}`)
// 		.heading1();
// 	if (papers.length > 0)
// 		papers.forEach((paper) => {
// 			doc
// 				.createParagraph(`§ ${paper.paragraph} ${paper.book.author}// ${paper.book.name}, ${paper.book.year}`)
// 				.bullet();
// 		});
// 	if (videos.length > 0)
// 		videos.forEach((video) => {
// 			doc.createParagraph(`► [${video.dur} мин.] ${video.bink}`).bullet();
// 		});
// 	if (tasks.length > 0)
// 		tasks.forEach((task) => {
// 			doc.createParagraph(`℗ ${task.nmb} ${task.book.author}// ${task.book.name}, ${task.book.year}`).bullet();
// 		});
// 	n++;
// });
module.exports = getDetailedSchedule;
