import axios from 'axios';

const root = '/api/lessons';

export default class LessonsAPI {
	static get(payload) {
		return axios
			.get(`${root}/${payload.sid}/${payload.classn}`)
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
							dur: response.data.items[0].contentDetails.duration
								.replace(/PT|S/g, '')
								.replace(/H|M/g, ':'),
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
}
