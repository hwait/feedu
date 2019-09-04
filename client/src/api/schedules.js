import axios from 'axios';

const root = '/api/schedules';

export default class ScheduleAPI {
	static getAll(payload) {
		return axios
			.post(`${root}/date`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static getSyllabus(payload) {
		return axios
			.post(`${root}/course`, payload)
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
	static generateCourse(payload) {
		console.log('=========generateCourse================');
		console.log(payload);
		console.log('====================================');
		const data = payload.map((x) => {
			return {
				...x,
				course: x.course._id
			};
		});
		return axios
			.post(`${root}/savecourse`, data)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
