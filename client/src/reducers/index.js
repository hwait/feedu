import { combineReducers } from 'redux';

import auth from './auth';
import subjects from './subjects';
import calendar from './calendar';
import lessons from './lessons';
import books from './books';
import book from './book';
import lesson from './lesson';

export default combineReducers({
	book,
	books,
	lessons,
	lesson,
	calendar,
	subjects,
	auth
});
