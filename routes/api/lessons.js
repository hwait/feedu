const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');
const convertErrors = require('../../utils/convertErrors');
const convertError = require('../../utils/convertError');
// Load Input validation
const { check, validationResult } = require('express-validator/check');

// Load Subject model
const Subject = require('../../models/Subject');
const Lesson = require('../../models/Lesson');

// @route   POST api/lessons/save
// @desc    Save Lesson
// @access  Private

router.post(
	'/save',
	[
		check('name').isLength({ min: 2 }),
		check('reshid').isInt(),
		check('classn').isInt({ gt: -1, lt: 13 }),
		check('nmb').isInt()
	],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: convertErrors(errors.array()) });
		}
		const { _id, name, reshid, classn, nmb, subject, isextended, videos, papers, tasks } = req.body;
		if (_id) {
			Lesson.findById(_id).then((lesson) => {
				if (lesson) {
					lesson.subject = subject;
					lesson.name = name;
					lesson.reshid = reshid;
					lesson.classn = classn;
					lesson.nmb = nmb;
					lesson.isextended = isextended;
					lesson.videos = videos;
					lesson.papers = papers;
					lesson.tasks = tasks;
					lesson // Try to save Book
						.save()
						.then(() => res.json({ success: true }))
						.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
				} else {
					console.log('404');
				}
			});
		} else {
			const newLesson = new Lesson({
				subject,
				name,
				reshid,
				classn: cln,
				nmb: n,
				isextended,
				videos: [],
				papers: [],
				tasks: []
			});
			newLesson // Try to save Lesson
				.save()
				.then(() => res.json({ success: true }))
				.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
		}
	}
);
// @route   GET api/lessons/video/:yid
// @desc    Retrieve video info from Yourtube API (key AIzaSyAfxTUKFVUhc2MlpgZOD84PUHj0CTg3fls)
// @access  Public
router.get('/video/:yid', (req, res) => {
	const { yid } = req.params;
	request({
		uri: 'https://www.googleapis.com/youtube/v3/videos',
		qs: {
			key: 'AIzaSyAfxTUKFVUhc2MlpgZOD84PUHj0CTg3fls',
			id: yid,
			fields: 'items(id,snippet(title),contentDetails(duration))',
			part: 'snippet,contentDetails'
		}
	}).pipe(res);
});
// @route   GET api/lessons/:sid/:cn
// @desc    Select all Lessons by Subject and ClassN
// @access  Public
router.get('/:sid/:cn', (req, res) => {
	const { sid, cn } = req.params;
	Lesson.find({ subject: sid, classn: cn }) //
		.sort({ nmb: 1 })
		.then((lessons) =>
			res.json(
				lessons.map(({ _id, name, nmb }) => {
					return {
						_id,
						name,
						nmb
					};
				})
			)
		)
		.catch((error) => {
			res.status(404).json({ error });
		});
});

// @route   GET api/lessons/:lid
// @desc    Select full Lesson info by _id
// @access  Public
router.get('/:lid', (req, res) => {
	const { lid } = req.params;
	Lesson.findOne({ _id: lid }) //
		.then((lesson) => res.json(lesson))
		.catch((error) => {
			res.status(404).json({ error });
		});
});

// @route   POST api/lessons/count
// @desc    Get lessons count for Subject and Class number
// @access  Public
router.post('/count', (req, res) => {
	const { subject, classn, isextended } = req.body;
	Lesson.find({ subject, classn, ...(isextended && { isextended }) }) // isextended is false only for ordinal lessons. For all please omit the parameter
		.then((results) => res.json({ classn: results.length }))
		.catch((error) => {
			res.status(404).json({ error });
		});
});
module.exports = router;
