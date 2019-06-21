const express = require('express');
const router = express.Router();
const passport = require('passport');
const convertError = require('../../utils/convertError');
const Schedule = require('../../models/Schedule');
const Lesson = require('../../models/Lesson');
const Course = require('../../models/Course');
const Book = require('../../models/Book');

// @route   POST api/schedules/save
// @desc    Add Schedules (Recursive)
// @access  Private
// TODO: SAVE: Check Role (Techer, Parent) and binding to supervisored Students only.
router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
	let updateSchedulePromise = (schedule) => {
		console.log(schedule.lesson);

		return new Promise((resolve, reject) => {
			Schedule.findOneAndUpdate({ lesson: schedule.lesson, student: schedule.student }, schedule, {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true
			})
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	};
	let getLessonsPromise = (course) => {
		return new Promise((resolve, reject) => {
			Lesson.find({ course }) //
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	};

	const patternsSave = (depth) => {
		if (depth >= 0) {
			const { student, dur, dates, course } = req.body[depth];
			console.log('============ ', depth, course);

			getLessonsPromise(course) //
				.then((lessons) => {
					console.log('===lessons ', lessons.length);
					let schedules = lessons.map(({ _id, tasks, course }, index) => {
						const scores = tasks.map(() => 0);
						return {
							lesson: _id,
							student,
							course,
							...(dates.length > index && { ts: dates[index] }),
							dur,
							status: 0,
							scores
						};
					});
					schedules.forEach((schedule) => {
						updateSchedulePromise(schedule);
					});
					patternsSave(depth - 1);
				})
				//.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
				.catch((errors) => console.log(errors));
		}
	};
	patternsSave(req.body.length - 1);

	return res.json({ success: true });
});

// @route   GET api/schedules/course
// @desc    Select Course syllabus
// @access  Public
router.post('/course', (req, res) => {
	const { uid, cid } = req.body;
	Schedule.find({ student: uid, course: cid }) //
		.populate({
			path: 'lesson',
			model: Lesson,
			select: 'name nmb tasks link videos papers'
		})
		.then((schedules) => {
			Course.findById(cid)
				.populate({
					path: 'books',
					model: Book,
					select: 'name author year'
				})
				.then((course) => {
					return res.json({
						course: course,
						schedules: schedules.map(({ _id, ts, status, dur, scores, lesson }) => ({
							_id,
							ts,
							status,
							dur,
							scores,
							lesson
						}))
					});
				})
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((errors) => res.status(404).json({ errors: errors }));
});

// @route   GET api/schedules/date
// @desc    Select Day Schedule
// @access  Public
router.post('/date', (req, res) => {
	const { uid, datefrom, dateto } = req.body;
	Schedule.find({ student: uid, ts: { $gte: datefrom, $lte: dateto } }) //
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
		.then((schedules) => res.json(schedules))
		.catch((errors) => res.status(404).json({ errors: errors }));
});

// @route   GET api/student/:id
// @desc    Select All Student's Schedules
// @access  Public
router.get('/student/:id', (req, res) => {
	const { id } = req.params;
	Schedule.find({ student: id }) //
		.then((schedules) => {
			let cids = schedules.map(({ course }) => course);
			Course.find({ _id: { $in: cids } }).then((courses) => {
				return res.json({
					courses: courses.map(({ _id, sname, subjects }) => ({ _id, name, sname, subjects })),
					schedules: schedules.map(({ _id, lesson, student, ts, dur, status, scores, course }) => {
						return {
							_id,
							lesson,
							student,
							ts,
							dur,
							status,
							scores,
							course
						};
					})
				});
			});
		})
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

// @route   GET api/schedules/course/:id
// @desc    Select Student Schedules by сid
// @access  Public
router.get('/course/:id', (req, res) => {
	const { id } = req.params;
	Schedule.find({ course: id }) //
		.then((schedules) =>
			res.json(
				schedules.map(({ _id, course, student, dates, ts, dur }) => {
					return {
						_id,
						course,
						student,
						dates,
						ts,
						dur
					};
				})
			)
		)
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

// @route   DELETE api/schedules/remove
// @desc    Delete schedule
// @access  Private
// TODO: DELETE: Check Role (Techer, Parent) and binding to supervisored Students only.
router.post('/remove', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { cid, uid, id } = req.body;
	Schedule.findById(id)
		.then((schedule) => {
			if (schedule) {
				schedule.remove().then(() => res.json({ cid, uid, id })); // To remove locally wee have to send this to a client
			} else {
				return res.status(404).json({ schedule: 'Schedule not found' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
});
module.exports = router;
