const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Some Calendars to study with
|--------------------------------------------------
*/

const CalendarSchema = new Schema({
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
	weekends: [
		{
			type: Number,
			required: true
		}
	],
	start: {
		type: Number,
		required: true
	}
});

module.exports = Calendar = mongoose.model('calendars', CalendarSchema);
