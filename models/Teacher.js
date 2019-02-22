const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Teachers are just Users, rating is calculated
| every week from Student results.
|--------------------------------------------------
*/

const TeacherSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	rating: {
		type: Number,
		default: 0
	},
	nstudents: {
		type: Number,
		default: 0
	}
});

module.exports = Teacher = mongoose.model('teachers', TeacherSchema);
