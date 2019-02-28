const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input validation
const validateStudentProfileInput = require('../../validators/student');

// Load models
const Student = require('../../models/student');

// @route   POST api/profile/new
// @desc    Create New Teacher
// @access  Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log('====================================');
	console.log(req.user, req.body);
	console.log('====================================');
	const { errors, isValid } = validateStudentProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	Student.findOne({ user: req.user.id }).then((x) => {
		if (x) {
			errors.exists = 'User already registered as Student';
			return res.status(400).json(errors);
		} else {
			const newx = new Student({
				user: req.user.id,
				class: req.body.class,
				teachers: req.body.teachers,
				subjects: req.body.subjects
			});
			newx // Try to save Student
				.save()
				.then((x) => res.json(x))
				.catch((err) => console.log(err));
		}
	});
});

// @route   DELETE api/profile/delete
// @desc    Delete Current Teacher
// @access  Private
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	Student.findOne({ user: req.user.id })
		.then((x) => {
			if (x) {
				x.remove().then(() => res.json({ success: true }));
			}
		})
		.catch((error) => res.status(401).json({ error }));
});

module.exports = router;
