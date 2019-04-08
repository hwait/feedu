const round = (number, places = 1) => {
	const m = Math.pow(10, places);
	return Math.floor(number * m) / m;
};

export default round;
