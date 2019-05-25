import axios from 'axios';

const root = '/api/patterns';

export default class PatternsAPI {
	static getAll() {
		return axios
			.get(`${root}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}

	static save(payload) {
		return axios
			.post(`${root}/save`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
