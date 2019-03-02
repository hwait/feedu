const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load Input validation
//const validateRegisterInput = require('../../validators/register');
//const validateLoginInput = require('../../validators/login');
const { check, body, validationResult } = require('express-validator/check');

// Load User model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
	'/register',
	[
		check('name').isLength({ min: 2, max: 30 }),
		check('email').isEmail(),
		check('password').isLength({ min: 6, max: 30 }),
		check('role').isIn([ 0, 1, 2, 3 ]),
		check(
			'password2',
			'Password Confirmation field must have the same value as the password field'
		).custom((value, { req }) => {
			return value === req.body.password;
		}),
		body('email').custom((value) => {
			return User.findOne({ email: value }).then((user) => {
				if (user) {
					return Promise.reject('E-mail already in use');
				}
			});
		})
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		const { name, password, email, role, classn, users } = req.body;
		const avatar = gravatar.url(req.body.email, {
			s: 200, // Size
			r: 'pg', // Rating
			d: 'mm' // Default image
		});
		const newUser = new User({ name, email, avatar, password, role, classn, users });

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
);

// @route   GET api/users/login
// @desc    Login user / Returning JWT
// @access  Public
router.post('/login', [ check('email').isEmail(), check('password').isLength({ min: 6, max: 30 }) ], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

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
									id: user.id,
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

// @route   GET api/users/:id
// @desc    Return User info
// @access  Public
router.get('/user/:email', (req, res) => {
	User.findOne({ email: req.params.email })
		.then((user) => {
			if (user) {
				const { password, ...userSafe } = user.toObject(); // Return User with no password field
				return res.json(userSafe);
			} else {
				return res.status(404).json({ user: 'User not found' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
});

// @route   GET api/users/current
// @desc    Get current user
// @access  Private
router.post('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user.id)
		.then((user) => {
			if (user) {
				const { password, ...userSafe } = user.toObject(); // Return User with no password field
				return res.json(userSafe);
			} else {
				return res.status(404).json({ user: 'User not found' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
});

// @route   GET api/users/teachers
// @desc    Select all active Teachers
// @access  Public
router.get('/teachers', (req, res) => {
	User.find({ role: 1, active: true }) //
		.sort({ name: 1 })
		.then((teachers) => res.json(teachers))
		.catch((error) => {
			res.status(404).json({ error });
		});
});

// @route   GET api/users/role
// @desc    Set current User Role
// @access  Private
router.post(
	'/role',
	[ check('role').isIn([ 0, 1, 2, 3 ]) ],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		User.findById(req.user.id)
			.then((user) => {
				if (user) {
					user.role = req.body.role;
					user //
						.save()
						.then(() => res.json({ success: true }))
						.catch((error) => res.status(400).json({ error }));
				} else {
					return res.status(404).json({ user: 'User not found' });
				}
			})
			.catch((error) => res.status(400).json({ error }));
	}
);

// @route   DELETE api/users/delete
// @desc    Delete Current user
// @access  Private
router.delete('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user.id)
		.then((user) => {
			if (user) {
				user.remove().then(() => res.json({ success: true }));
			} else {
				return res.status(404).json({ user: 'User not found' });
			}
		})
		.catch((error) => res.status(400).json({ error }));
});

module.exports = router;
