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
	course: {
		type: Schema.Types.ObjectId,
		ref: 'course'
	},
	dur: {
		type: Number,
		required: true
	},
	dates: [
		{
			type: String,
			required: true
		}
	]
});

module.exports = Pattern = mongoose.model('patterns', PatternSchema);
