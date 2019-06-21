import { combineReducers } from 'redux';

import auth from './auth';
import subjects from './subjects';
import schedules from './schedules';
import patterns from './patterns';
import courses from './courses';
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
	courses,
	patterns,
	schedules,
	subjects,
	auth
});
