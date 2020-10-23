const { Sources, isDev } = require(`./const`);

const getJSON = (src, page) => {
	try {
		const dataSrc = require(src);
		if (typeof dataSrc.get === `function`) {
			return dataSrc.get({ page });
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
	...getJSON(`../${Sources.DATA}`, page)
});

module.exports = {
	preparePageData
};
