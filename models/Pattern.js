const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Just current pattern for schedule, to arrange
| Active and Scheduled lessons further.
|--------------------------------------------------
*/
const PatternSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'students'
	},
	calendar: {
		type: Schema.Types.ObjectId,
		ref: 'calendar'
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'subject'
	},
	weekday: {
		type: Number,
		required: true
	},
	ts: {
		type: Number,
		required: true
	},
	dur: {
		type: Number,
		required: true
	},
	cn: {
		//Class Nmb
		type: Number,
		required: true
	},
	days: {
		//Days in the calendar
		type: Number,
		required: true
	}
});

module.exports = Pattern = mongoose.model('patterns', PatternSchema);
