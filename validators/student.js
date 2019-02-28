const Validator = require('validator');
const isEmpty = require('../utils/isempty');

module.exports = function validateStudentProfileInput(data) {
	let errors = {};

	if (!Validator.isInt(data.class)) {
		errors.class = 'Class field must be a number';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
