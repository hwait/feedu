const express = require('express');
const router = express.Router();
const passport = require('passport');
const request = require('request');
const convertError = require('../../utils/convertError');
const { check, validationResult } = require('express-validator/check');
const Book = require('../../models/Book');

// @route   POST api/books/add
// @desc    Add Book
// @access  Private
router.post(
	'/save',
	[
		check('name').isLength({ min: 2 }),
		check('author').isLength({ min: 2 }),
		check('classfrom').isInt({ gt: -1, lt: 13 }),
		check('classto').isInt({ gt: -1, lt: 13 }),
		check('type').isInt({ gt: -1, lt: 6 }),
		check('year').isInt()
	],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: convertError(errors.errors) });
		}
		const { _id, name, author, classfrom, classto, type, year, binded, subject } = req.body;
		if (_id) {
			Book.findById(_id).then((book) => {
				if (book) {
					book.subject = subject;
					book.name = name;
					book.author = author;
					book.classfrom = classfrom;
					book.classto = classto;
					book.type = type;
					book.year = year;
					if (binded) book.binded = binded;
					book // Try to save Book
						.save()
						.then(() => res.json({ success: true }))
						.catch((errors) => res.status(400).json({ errors: convertError(errors.errors) }));
				} else {
					console.log('404');
				}
			});
		} else {
			const newBook = new Book({
				subject,
				name,
				author,
				classfrom,
				classto,
				type,
				year,
				...(binded && { binded })
			});
			newBook // Try to save Book
				.save()
				.then((book) => res.json({ success: true, _id: book._id }))
				.catch((errors) => {
					return res.status(400).json({ errors: convertError(errors.errors) });
				});
		}
	}
);

// @route   GET api/book/:bid
// @desc    Select Book by Id
// @access  Public
router.get('/:bid', (req, res) => {
	const { bid } = req.params;
	Book.findById(bid) //
		.then((book) => res.json(book))
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

// @route   GET api/books/:sid/:cn
// @desc    Select all Books by Subject and ClassN
// @access  Public
router.get('/:sid/:cn', (req, res) => {
	const { sid, cn } = req.params;
	Book.find({ subject: sid, classfrom: { $lte: cn }, classto: { $gte: cn } }) //
		.then((books) =>
			res.json(
				books.map(({ _id, name, author }) => {
					return {
						_id,
						name,
						author
					};
				})
			)
		)
		.catch((errors) => res.status(404).json({ errors: convertError(errors.errors) }));
});

module.exports = router;
