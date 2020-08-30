const isDev = !process.env.NODE_ENV;

const getJSON = (src, page) => {
	try {
		const dataSrc = require(src);
		if (typeof dataSrc.get === `function`) {
			return dataSrc.get({ isDev, page });
		}
		return dataSrc;
	} catch (err) {
		return {};
	}
};

const preparePageData = (page) => ({
	isDev,
	page,
	pathToRoot: page.replace(/[^/]/g, ``).replace(/\//g, `../`),
	...getJSON(`../source/data`, page)
});

module.exports = {
	preparePageData
};
