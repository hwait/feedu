const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load Input validation
const validateRegisterInput = require('../../validators/register');
const validateLoginInput = require('../../validators/login');

// Load User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: 200, // Size
				r: 'pg', // Rating
				d: 'mm' // Default image
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser // Try to save User
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT
// @access  Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }) // Check User exists
		.then((user) => {
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json(errors);
			} else {
				bcrypt
					.compare(password, user.password) // Check if password correct
					.then((isMatch) => {
						if (isMatch) {
							// User password ok
							const payload = { id: user.id, name: user.name, avatar: user.avatar };
							jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
								return res.json({
									success: true,
									token: 'Bearer ' + token
								});
							});
						} else {
							errors.password = 'Password incorrect';
							return res.status(400).json(errors);
						}
					});
			}
		});
});

// @route   GET api/users/current
// @desc    Return Current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

// @route   DELETE api/users/delete
// @desc    Delete Current user
// @access  Private
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user.id)
		.then((user) => {
			user.remove().then(() => res.json({ success: true }));
		})
		.catch((err) => res.status(401).json({ notauthorized: 'User not authorized' }));
});

module.exports = router;
