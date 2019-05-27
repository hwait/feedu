import axios from 'axios';

const root = '/api/patterns';

export default class PatternsAPI {
	static getAll(payload) {
		return axios
			.get(`${root}/student/${payload}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}

	static save(payload) {
		return axios
			.post(`${root}/save`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static remove(payload) {
		return axios
			.post(`${root}/remove`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
