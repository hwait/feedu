import axios from 'axios';

const root = '/api/books';

export default class BooksAPI {
	static getAll(payload) {
		return axios
			.get(`${root}/subject/${payload.sid}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static getOne(payload) {
		return axios
			.get(`${root}/${payload}`)
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
