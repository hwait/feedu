import axios from 'axios';

const root = '/api/books';

export default class BooksAPI {
	static getAll(payload) {
		return axios
			.get(`${root}/${payload.sid}/${payload.classn}`)
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
			.then((response) => {
				return {
					response: {
						index: payload.index,
						item: { _id: response.data._id, loading: false }
					}
				};
			})
			.catch((err) => {
				return {
					errors: {
						index: payload.index,
						item: { errors: err.response.data.errors, loading: false }
					}
				};
			});
	}
}