const convertError = (error) =>
	Object.keys(error).reduce((ret, x) => {
		ret[x] = error[x].message;
		return ret;
	}, {});

module.exports = convertError;
