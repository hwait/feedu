const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Subjects 
|--------------------------------------------------
*/

const SubjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true
	},
	color: {
		type: String,
		required: true
	},
	status: {
		type: Boolean,
		required: true
	}
});

module.exports = Subject = mongoose.model('subjects', SubjectSchema);
