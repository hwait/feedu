const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Lessons with full description. 
|--------------------------------------------------
*/

const LessonSchema = new Schema({
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'subjects'
	},
	class: {
		type: Number,
		required: true
	},
	nmb: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	isextended: {
		type: Boolean,
		default: false
	},
	reshid: {
		// Resh link: https://resh.edu.ru/Lesson/lesson/<reshid>/
		type: Number
	},
	videos: [
		{
			yid: {
				type: String,
				required: true
			},
			duration: {
				type: Number,
				required: true
			}
		}
	],
	papers: [
		{
			book: {
				type: Schema.Types.ObjectId,
				ref: 'books'
			},
			paragraph: {
				type: Number,
				required: true
			}
		}
	],
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
			difficulty: {
				/**
                |--------------------------------------------------
                | 0 - Easy
                | 1 - Medium
                | 2 - Hard
                |--------------------------------------------------
                */
				type: Number,
				default: 1
			}
		}
	]
});

module.exports = Lesson = mongoose.model('lessons', LessonSchema);
