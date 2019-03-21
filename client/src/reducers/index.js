import { combineReducers } from 'redux';

import auth from './auth';

/**
	|--------------------------------------------------
	| // TODO: Add reducer for Classes and Subjects (one or two) 
	| // TODO: Add selectors to Subjects
	| // TODO: Get Subjects from DB on app init
	|--------------------------------------------------
	*/
export default combineReducers({
	auth
});
