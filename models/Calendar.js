const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Some Calendars to study with
|--------------------------------------------------
*/

const CalendarSchema = new Schema({
	group: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	dates: [
		{
			type: String,
			required: true
		}
	],
	start: {
		type: Number,
		required: true
	}
});

module.exports = Calendar = mongoose.model('calendars', CalendarSchema);
