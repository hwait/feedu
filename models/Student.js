const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Student are just Users, must have Teacher
|--------------------------------------------------
*/

const StudentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	teacher: {
		type: Schema.Types.ObjectId,
		ref: 'teacher'
	},
	class: {
		type: Number,
		default: 1
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
			},
			isextended: {
				type: Boolean,
				default: false
			}
		}
	]
});

module.exports = Student = mongoose.model('students', StudentSchema);
