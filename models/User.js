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
	active: {
		type: Boolean,
		default: true
	},
	users: [
		// Teachers or Students
		{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	]
});

module.exports = User = mongoose.model('users', UserSchema);
