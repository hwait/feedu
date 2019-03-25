const transformErrors = (error) => {
	if (error.response.status === 401) return { errors: { code: '401. Unauthorized' } };
	else if (error.response.status === 400) return { errors: { code: '400. Server error' } };
	else return { errors: error.response.data.errors };
};

export default transformErrors;
