// Утилиты в формате CommonJS для работы posthtml и webpack

const FIRST_TWO_DIGIT_NUM = 10;

const Util = {
	dropExt(filename) {
		return filename.slice(0, filename.lastIndexOf('.'));
	},
	formatNumberWithLeadZero(number) {
		return `${number < FIRST_TWO_DIGIT_NUM ? '0' : ''}${number}`;
	},
	numberize(str) {
		const numberized = str.replace(/\D/g, '');
		return str.slice(0, 1) === '+' ? `+${numberized}` : numberized;
	},
	punctify(str, sign = '.') {
		if ((/(\.|\?|!|,|:|…)$/).test(str)) {
			return str;
		}
		return str + sign;
	},
	quotify(str, sign = '"') {
		const firstSign = str.slice(0, 1) === sign ? '' : sign;
		const lastSign = str.slice(-1) === sign ? '' : sign;

		return firstSign + str + lastSign;
	},
	setProp(obj, key, value = null) {
		obj[key] = value;
		return obj;
	}
};

module.exports = {
	...Util,
	applyDataWithFn(fn, data = {}) {
		return eval(`(${fn.replace(/;\s*$/, '')})`)(data, Util); // eslint-disable-line
	}
};
