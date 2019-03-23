const convertErrors = (errors) =>
	errors.reduce((ret, x) => {
		ret[x.param] = x.msg;
		return ret;
	}, {});

module.exports = convertErrors;
