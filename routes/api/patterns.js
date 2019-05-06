const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');
const convertError = require('../../utils/convertError');
const { check, validationResult } = require('express-validator/check');
const Pattern = require('../../models/Pattern');

// @route   POST api/patterns/save
// @desc    Add Patterns (Recursive)
// @access  Private
// TODO: SAVE: Check Role (Techer, Parent) and binding to supervisored Students only.
router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
	const patternsSave = (depth) => {
		if (depth >= 0) {
			const { _id, student, calendar, weekday, hour, subject } = req.body.patterns[depth];
			if (_id) {
				Pattern.findById(_id).then((pattern) => {
					if (pattern) {
						pattern.subject = subject;
						pattern.student = student;
						pattern.calendar = calendar;
						pattern.weekday = weekday;
						pattern.hour = hour;
						pattern // Try to save Pattern
							.save()
							.then(patternsSave(depth - 1))
							.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
					} else {
						console.log('404', _id);
					}
				});
			} else {
				const newPattern = new Pattern({
					subject,
					student,
					calendar,
					weekday,
					hour
				});
				newPattern // Try to save Pattern
					.save()
					.then(patternsSave(depth - 1))
					.catch((errors) => {
						return res.status(400).json({ errors: convertError(errors.errors) });
					});
			}
		}
	};
	patternsSave(req.body.patterns.length - 1);
	return res.json({ success: true });
});

// @route   GET api/patterns/student/:id
// @desc    Select Student Patterns by sid
// @access  Public
router.get('/student/:id', (req, res) => {
	const { id } = req.params;
	Pattern.find({ student: id }) //
		.then((patterns) =>
			res.json(
				patterns.map(({ _id, subject, student, calendar, weekday, hour }) => {
					return {
						_id,
						subject,
						student,
						calendar,
						weekday,
						hour
					};
				})
			)
		)
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

// @route   GET api/patterns/subject/:id
// @desc    Select Student Patterns by sid
// @access  Public
router.get('/subject/:id', (req, res) => {
	const { id } = req.params;
	Pattern.find({ subject: id }) //
		.then((patterns) =>
			res.json(
				patterns.map(({ _id, subject, student, calendar, weekday, hour }) => {
					return {
						_id,
						subject,
						student,
						calendar,
						weekday,
						hour
					};
				})
			)
		)
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

// @route   DELETE api/patterns/delete/:id
// @desc    Delete pattern
// @access  Private
// TODO: DELETE: Check Role (Techer, Parent) and binding to supervisored Students only.
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { id } = req.params;
	Pattern.findById(id)
		.then((pattern) => {
			if (pattern) {
				pattern.remove().then(() => res.json({ success: true }));
			} else {
				return res.status(404).json({ pattern: 'Pattern not found' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
});
module.exports = router;
