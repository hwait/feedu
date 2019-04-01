const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');

// Load Input validation
const { check, validationResult } = require('express-validator/check');

// Load Subject model
const Subject = require('../../models/Subject');
const Lesson = require('../../models/Lesson');

// @route   POST api/lessons/add
// @desc    Add Lesson
// @access  Private
//n;cln;name;reshid;sid
router.post(
	'/add',
	[
		check('name').isLength({ min: 2 }),
		check('reshid').isInt(),
		check('cln').isInt({ gt: -1, lt: 13 }),
		check('n').isInt(),
		check('sid').isInt()
	],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, reshid, cln, n, sid, isextended } = req.body;

		Subject.findOne({ reshid: sid })
			.then((subject) => {
				if (subject) {
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
						.catch((error) => res.status(400).json({ error }));
				} else {
					throw new Error('No Subject has found with reshid=' + sid);
				}
			})
			.catch((error) => res.status(400).json({ error }));
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

module.exports = router;
