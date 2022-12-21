export default (str, args) => {
	const [sign = '.'] = args || [];

	if (/(\.|\?|!|,|:|…)$/.test(str)) {
		return str;
	}
	return `${str}${sign}`;
};
