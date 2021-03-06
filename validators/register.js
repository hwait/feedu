const Validator = require('validator');
const isEmpty = require('../utils/isempty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	// Check fields by the custom isEmpty function to be sure it's a string after
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';
	data.users = !isEmpty(data.users) ? data.users : [];

	if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
		errors.name = 'Name must be between 2 and 30 characters';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (!Validator.isIn(data.role, [ 0, 1, 2, 3 ])) {
		errors.role = 'Role is invalid';
	}
	if (!Validator.isIn(data.class, [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ])) {
		errors.class = 'Class is invalid';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password field is required';
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Password must match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
