export default {
	filters: [
		{
			func(str, args) {
				if (!str) {
					return '';
				}

				const [sign = '.'] = args || [];

				if ((/(\.|\?|!|,|:|…)$/).test(str)) {
					return str;
				}
				return `${str}${sign}`;
			},
			name: 'punctify'
		}
	]
};
