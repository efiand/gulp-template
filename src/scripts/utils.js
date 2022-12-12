export const aliasify = (str) => str.replace(/\W/g, '').toLowerCase();

export const checkModPressed = (evt) => evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey;

export const html = (raw, ...values) => String.raw({ raw }, ...values);

export const punctify = (str, args) => {
	const [sign = '.'] = args || [];

	if (/(\.|\?|!|,|:|…)$/.test(str)) {
		return str;
	}
	return `${str}${sign}`;
};

export const initApp = (App, target = null, props = {}) => {
	if (!App || !target) {
		return null;
	}

	return new App({
		hydrate: true,
		props,
		target
	});
};
