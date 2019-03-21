const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input validation
const { check, validationResult } = require('express-validator/check');

// Load Subject model
const Subject = require('../../models/Subject');

// @route   POST api/subjects/add
// @desc    Add Subject
// @access  Private
router.post(
	'/add',
	[
		check('name').isLength({ min: 2, max: 30 }),
		check('reshid').isInt(),
		check('classfrom').isInt({ gt: -1, lt: 13 }),
		check('classto').isInt({ gt: -1, lt: 13 })
	],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, reshid, classfrom, classto, extendable } = req.body;
		const newSubject = new Subject({ name, reshid, classfrom, classto, extendable });
		newSubject // Try to save Subject
			.save()
			.then(() => res.json({ success: true }))
			.catch((error) => res.status(400).json({ error }));
	}
);

// @route   GET api/subjects
// @desc    Select all active subjects
// @access  Public
router.get('/', (req, res) => {
	Subject.find() //
		.sort({ name: 1 })
		.then((subjects) => res.json(subjects))
		.catch((error) => {
			res.status(404).json({ error });
		});
});
module.exports = router;