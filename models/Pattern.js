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
		type: String,
		required: true
	},
	weekday: {
		type: Number,
		required: true
	}
});

module.exports = Pattern = mongoose.model('patterns', PatternSchema);
