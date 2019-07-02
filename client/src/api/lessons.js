import axios from 'axios';
import moment from 'moment';
const root = '/api/lessons';

export default class LessonsAPI {
	static get(payload) {
		return axios
			.get(`${root}/course/${payload}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static lessonGet(payload) {
		return axios
			.get(`${root}/${payload}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static videoInfoGet(payload) {
		return axios
			.get(`${root}/video/${payload.link}`)
			.then((response) => {
				return {
					response: {
						index: payload.index,
						item: {
							name: response.data.items[0].snippet.title,
							dur: parseInt(moment.duration(response.data.items[0].contentDetails.duration).asMinutes()),
							// .replace(/PT|S/g, '')
							// .replace(/H|M/g, ':'),
							loading: false
						}
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
	static lessonSave(payload) {
		return axios
			.post(`${root}/save`, payload)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
	static lessonInc(payload) {
		return axios
			.get(`${root}/gap/${payload.cid}/${payload.nstart}`)
			.then((response) => ({ response: response.data }))
			.catch((err) => ({ errors: err.response.data.errors }));
	}
}
