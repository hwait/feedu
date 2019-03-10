import axios from 'axios';

const root = '/api/users';

export default class AuthAPI {
	static get() {
		return axios.get(root);
	}
	static edit(payload) {
		return axios.put(`${root}/edit/payload.id`, payload);
	}
	static add(payload) {
		return axios
			.post(`${root}/register`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static delete(payload) {
		return axios.delete(`${root}/delete/${payload.id}`);
	}
}
