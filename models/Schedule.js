const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Schedule with arranged Lessons by current Pattern
|--------------------------------------------------
*/

const ScheduleSchema = new Schema({
	student: {
		type: Schema.Types.ObjectId,
		ref: 'students'
	},
	lesson: {
		type: Schema.Types.ObjectId,
		ref: 'lessons'
	},
	course: {
		type: Schema.Types.ObjectId,
		ref: 'courses'
	},
	ts: {
		type: Date
	},
	dur: {
		type: Number,
		required: true
	},
	status: {
		/**
        |--------------------------------------------------
        | 0 - Scheduled
        | 1 - Active
        | 2 - Finished
        |--------------------------------------------------
        */
		type: Number,
		required: true
	},
	scores: [
		{
			/**
                |--------------------------------------------------
                | 0 - Not completed			|
                | 0.5 - Done with errors	 > * Difficulty (from Lesson)
                | 1 - Correct				|
                |--------------------------------------------------
                */
			type: Number,
			required: true
		}
	]
});

module.exports = Schedule = mongoose.model('schedules', ScheduleSchema);
