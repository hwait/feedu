const Schedule = require('../../models/Schedule');
const Lesson = require('../../models/Lesson');
const Course = require('../../models/Course');
const Book = require('../../models/Book');
const moment = require('moment');
moment.locale('ru');

const getSchedule = (user, current) => {
	const uid = '5c84ae30078bcd02fcc0181f';
	ds = current ? moment().startOf('week') : moment().add(7, 'd').startOf('week');
	de = current ? moment().endOf('week') : moment().add(7, 'd').endOf('week');
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
		.then((schedules) =>
			res.json(
				schedules.map(({ _id, lesson, ts, dur, status, scores }) => {
					return {
						_id,
						lesson,
						ts,
						dur,
						status,
						scores
					};
				})
			)
		)
		.catch((errors) => res.status(404).json({ errors: errors }));

	return `*getSchedule:* ${ds}-${de}`;
};

module.exports = getSchedule;
