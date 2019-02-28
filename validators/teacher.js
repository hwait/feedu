const Validator = require('validator');
const isEmpty = require('../utils/isempty');

module.exports = function validateTeacherProfileInput(data) {
	let errors = {};

	// There is no fields in Teacher model yet

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
