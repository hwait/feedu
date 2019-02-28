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
	active: {
		type: Boolean,
		default: true
	},
	rating: {
		type: Number,
		default: 0
	},
	nstudents: {
		type: Number,
		default: 0
	},
	subjects: [
		{
			name: {
				type: String,
				required: true
			},
			class: {
				type: Number,
				required: true
			}
		}
	],
	students: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	]
});

module.exports = Teacher = mongoose.model('teachers', TeacherSchema);
