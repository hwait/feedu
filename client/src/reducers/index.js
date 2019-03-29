import { combineReducers } from 'redux';

import auth from './auth';
import subjects from './subjects';
import lessons from './lessons';

/**
	|--------------------------------------------------
	|--------------------------------------------------
	*/
export default combineReducers({
	lessons,
	subjects,
	auth
});
