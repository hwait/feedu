const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Subjects with Lessons links
|--------------------------------------------------
*/

const SubjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	reshid: {
		type: Number,
		required: true
	},
	classfrom: {
		type: Number,
		required: true
	},
	classto: {
		type: Number,
		required: true
	},
	extendable: {
		type: Boolean,
		default: false
	},
	color: {
		type: String,
		required: true
	}
});

module.exports = Subject = mongoose.model('subjects', SubjectSchema);
