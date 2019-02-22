const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Subjects with Lessons links
|--------------------------------------------------
*/

const SubjectSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	classfrom: {
		type: Number,
		required: true
	},
	classto: {
		type: Number,
		required: true
	},
	lessons: [
		{
			lesson: {
				type: Schema.Types.ObjectId,
				ref: 'lessons'
			}
		}
	]
});

module.exports = Subject = mongoose.model('subjects', SubjectSchema);
