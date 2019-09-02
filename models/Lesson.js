const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Lessons with full description. 
|--------------------------------------------------
*/

const LessonSchema = new Schema({
	course: {
		type: Schema.Types.ObjectId,
		ref: 'courses'
	},
	nmb: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	link: {
		// Resh link: https://resh.edu.ru/Lesson/lesson/<reshid>/
		type: String
	},
	videos: [
		{
			name: {
				type: String,
				required: false
			},
			link: {
				type: String,
				required: true
			},
			dur: {
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
				type: String,
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
