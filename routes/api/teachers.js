const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input validation
const validateTeacherProfileInput = require('../../validators/teacher');

// Load models
const Teacher = require('../../models/teacher');

// @route   POST api/teachers/
// @desc    Get all active Teachers
// @access  Public
router.get('/', (req, res) => {
	/**
	|--------------------------------------------------
	| Make request to Users for the name and avatar
	|--------------------------------------------------
	*/
	Teacher.find({ active: true }).then((x) => res.json(x));
});

// @route   POST api/teachers/new
// @desc    Create a New Teacher
// @access  Private
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
	console.log('====================================');
	console.log(req.user, req.body);
	console.log('====================================');
	const { errors, isValid } = validateTeacherProfileInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	Teacher.findOne({ user: req.user.id }).then((x) => {
		if (x) {
			errors.exists = 'User already registered as Teacher';
			return res.status(400).json(errors);
		} else {
			const newx = new Teacher({
				user: req.user.id
			});
			newx // Try to save Teacher
				.save()
				.then((x) => res.json(x))
				.catch((err) => console.log(err));
		}
	});
});

// @route   DELETE api/teachers/delete
// @desc    Delete Current Teacher
// @access  Private
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	const resp = {};
	Teacher.findOne({ user: req.user.id })
		.then((x) => {
			if (x) {
				x.remove().then(() => res.json({ success: true }));
			}
		})
		.catch((error) => res.status(401).json({ error }));
});

module.exports = router;
