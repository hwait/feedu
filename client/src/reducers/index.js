import { combineReducers } from 'redux';

import auth from './auth';
import subjects from './subjects';
import lessons from './lessons';
import books from './books';
import lesson from './lesson';

export default combineReducers({
	books,
	lessons,
	lesson,
	subjects,
	auth
});
