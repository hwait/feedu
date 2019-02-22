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
	date: {
		type: Number,
		required: true
	},
	status: {
		/**
        |--------------------------------------------------
        | 0 - Scheduled
        | 1 - Active
        | 2 - Finished
        | 3 - Suspended
        | 4 - Cancelled
        |--------------------------------------------------
        */
		type: Number,
		required: true
	},
	tasks: [
		{
			book: {
				type: Schema.Types.ObjectId,
				ref: 'books'
			},
			nmb: {
				type: String,
				required: true
			},
			mark: {
				/**
                |--------------------------------------------------
                | 0 - Not completed
                | 1 - Done with errors
                | 2 - Correct
                |--------------------------------------------------
                */
				type: Number
			},
			comment: {
				type: String
			}
		}
	]
});

module.exports = Schedule = mongoose.model('schedules', ScheduleSchema);
