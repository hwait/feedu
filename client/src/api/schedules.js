import axios from 'axios';

const root = '/api/schedules';

export default class ScheduleAPI {
	static getAll(payload) {
		return axios
			.get(`${root}/student/${payload}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}

	static generate(payload) {
		const data = payload.map((x) => {
			return {
				...x,
				course: x.course._id
			};
		});
		return axios
			.post(`${root}/save`, data)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
