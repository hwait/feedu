const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| User, can be Teacher or Student
|--------------------------------------------------
*/

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	role: {
		/**
		|--------------------------------------------------
		| 0 - Student
		| 1 - Teacher
		| 2 - Parent
		|--------------------------------------------------
		*/
		type: Number,
		default: 0
	},
	classn: {
		type: Number,
		default: 0 // No class
	},
	active: {
		type: Boolean,
		default: true
	},
	users: [
		// Teachers or Students
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	subjects: [
		// Teacher is competent with / Student study
		{
			subject: {
				type: Schema.Types.ObjectId,
				ref: 'subjects'
			}
		}
	]
});

module.exports = User = mongoose.model('users', UserSchema);
