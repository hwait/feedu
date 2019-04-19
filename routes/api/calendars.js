const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');
const convertError = require('../../utils/convertError');
const { check, validationResult } = require('express-validator/check');
const Calendar = require('../../models/Calendar');

// @route   POST api/calendars/save
// @desc    Add Calendar
// @access  Private
router.post(
	'/save',
	[ check('name').isLength({ min: 2 }), check('start').isInt() ],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: convertErrors(errors.array()) });
		}
		const { _id, name, dates, weekends, start } = req.body;
		if (_id) {
			Calendar.findById(_id).then((calendar) => {
				if (calendar) {
					calendar.name = name;
					calendar.dates = dates;
					calendar.weekends = weekends;
					calendar.start = start;
					calendar // Try to save Calendar
						.save()
						.then(() => res.json({ success: true }))
						.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
				} else {
					console.log('404');
				}
			});
		} else {
			const newCalendar = new Calendar({
				name,
				dates,
				weekends,
				start
			});
			newCalendar // Try to save Calendar
				.save()
				.then((calendar) => res.json({ success: true, _id: calendar._id }))
				.catch((errors) => {
					return res.status(400).json({ errors: convertError(errors.errors) });
				});
		}
	}
);

// @route   GET api/calendar/:bid
// @desc    Select Calendar by Id
// @access  Public
router.get('/:bid', (req, res) => {
	const { bid } = req.params;
	Calendar.findById(bid) //
		.then((calendar) => res.json(calendar))
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

// @route   GET api/calendars/
// @desc    Select all Calendars by Subject and ClassN
// @access  Public
router.get('/', (req, res) => {
	Calendar.find({}) //
		.then((calendars) =>
			res.json(
				calendars.map(({ _id, name, author }) => {
					return {
						_id,
						name
					};
				})
			)
		)
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

module.exports = router;
