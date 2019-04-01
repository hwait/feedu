const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
|--------------------------------------------------
| Some Books to study with
|--------------------------------------------------
*/

const BookSchema = new Schema({
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'subject',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	author: {
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
	year: {
		type: Number,
		required: true
	},
	type: {
		/**
		|--------------------------------------------------
		| 0 - Text book
		| 1 - Task book
		| 2 - Work book
		| 3 - Audio book
		| 4 - Check book
		| 5 - Solutions book
		|--------------------------------------------------
		*/
		type: String,
		required: true
	},
	binded: {
		type: Schema.Types.ObjectId,
		ref: 'books',
		required: false
	}
});

module.exports = Book = mongoose.model('books', BookSchema);
