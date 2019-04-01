import axios from 'axios';

const root = '/api/lessons';

export default class LessonsAPI {
	static get(payload) {
		return axios
			.get(`${root}/${payload.sid}/${payload.classn}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static getLesson(payload) {
		return axios
			.get(`${root}/${payload}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
