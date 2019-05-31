const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Courses with Lessons links
|--------------------------------------------------
*/

const CourseSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	sname: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: false
	},
	// subjects: [
	// 	// Can belong to many subjects
	// 	{
	// 		type: String,
	// 		required: true
	// 	}
	// ],
	subjects: [
		// Can belong to many subjects
		{
			type: Schema.Types.ObjectId,
			ref: 'subjects'
		}
	],
	lessonsn: {
		type: Number,
		required: true
	},
	books: [
		{
			type: Schema.Types.ObjectId,
			ref: 'books'
		}
	]
});

module.exports = Course = mongoose.model('courses', CourseSchema);
