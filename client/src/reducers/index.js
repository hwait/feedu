import { combineReducers } from 'redux';

import auth from './auth';
import subjects from './subjects';

/**
	|--------------------------------------------------
	|--------------------------------------------------
	*/
export default combineReducers({
	subjects,
	auth
});
