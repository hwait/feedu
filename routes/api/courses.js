const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');
const convertErrors = require('../../utils/convertErrors');
const convertError = require('../../utils/convertError');
const mongoose = require('mongoose');
// Load Input validation
const { check, validationResult } = require('express-validator/check');

// Load Course model
const Course = require('../../models/Course');

// @route   POST api/courses/save
// @desc    Save Course
// @access  Private
router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = validationResult(req);
	const { _id, name, sname, link, lessonsn, description, books, subjects } = req.body;
	if (_id) {
		Course.findById(_id).then((course) => {
			if (course) {
				course.name = name;
				course.sname = sname;
				course.link = link;
				course.lessonsn = lessonsn;
				course.description = description;
				course.books = books;
				course.subjects = subjects;
				course // Try to save Book
					.save()
					.then(() => res.json({ success: true }))
					.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
			} else {
				console.log('404');
			}
		});
	} else {
		const newCourse = new Course({
			name,
			sname,
			link,
			lessonsn,
			description,
			books: [],
			subjects
		});
		newCourse // Try to save Course
			.save()
			.then(() => res.json({ success: true, id: newCourse._id }))
			.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
	}
});
// @route   GET api/courses/subject/:sid
// @desc    Select all Courses by Subject
// @access  Public
router.get('/subject/:sid', (req, res) => {
	const { sid } = req.params;
	Course.find({ subjects: sid }) //
		.then((courses) =>
			res.json(
				courses.map(({ _id, name, sname }) => {
					return {
						_id,
						name,
						sname
					};
				})
			)
		)
		.catch((error) => {
			res.status(404).json({ error });
		});
});

// @route   GET api/courses/:cid
// @desc    Select full Course info by _id
// @access  Public
router.get('/:cid', (req, res) => {
	const { cid } = req.params;
	Course.findOne({ _id: cid }) //
		.then((course) => res.json(course))
		.catch((error) => {
			res.status(404).json({ error });
		});
});

// @route   POST api/courses/count
// @desc    Get courses count for Course and Class number
// @access  Public
router.post('/count', (req, res) => {
	const { course } = req.body;
	Course.find({ course }).then((results) => res.json({ count: results.length })).catch((error) => {
		res.status(404).json({ error });
	});
});

// @route   DELETE api/courses/delete/:cid
// @desc    Delete Course
// @access  Private
router.delete('/delete/:cid', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { cid } = req.params;
	Course.findById(cid)
		.then((course) => {
			if (course) {
				course.remove().then(() => res.json({ success: true }));
			} else {
				return res.status(404).json({ course: 'Course not found' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
});
module.exports = router;
