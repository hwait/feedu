import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import transformErrors from '../utils/transformErrors';
const root = '/api/users';

export default class AuthAPI {
	static get() {
		return axios.get(root);
	}
	static edit(payload) {
		return axios.put(`${root}/edit/payload.id`, payload);
	}
	static register(payload) {
		return axios
			.post(`${root}/register`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => transformErrors(err));
	}
	static save(payload) {
		return axios
			.post(`${root}/save`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => transformErrors(err));
	}
	static login(payload) {
		return axios
			.post(`${root}/login`, payload)
			.then((response) => {
				// Save to localStorage
				const { token } = response.data;
				// Set token to ls
				localStorage.setItem('jwtToken', token);
				// Set token to Auth header
				setAuthToken(token);
				const decoded = jwt_decode(token);
				return { response: decoded };
			})
			.catch((err) => transformErrors(err));
	}
	static delete(payload) {
		return axios.delete(`${root}/delete/${payload.id}`);
	}
}
