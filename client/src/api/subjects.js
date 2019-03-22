import axios from 'axios';

const root = '/api/subjects';

export default class SubjectsAPI {
	static get() {
		return axios
			.get(root)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
