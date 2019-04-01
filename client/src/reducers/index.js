import { combineReducers } from 'redux';

import auth from './auth';
import subjects from './subjects';
import lessons from './lessons';
import lesson from './lesson';

export default combineReducers({
	lessons,
	lesson,
	subjects,
	auth
});
