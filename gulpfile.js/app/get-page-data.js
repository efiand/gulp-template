const { isDev, Paths } = require(`../constants`);

const getPageData = (page) => {
	let commonConstants = {};
	try {
		commonConstants = require(`../../${Paths.DATA_COMMON_SRC}`);
	} catch (err) {
		commonConstants = {};
	}

	let pageConstants = {};
	try {
		pageConstants = require(`../../${Paths.DATA_PAGES_SRC}/${page}`);
	} catch (err) {
		pageConstants = {};
	}

	const pageData = {
		isDev,
		page,
		pathToRoot: page.replace(/[^/]/g, ``).replace(/\//g, `../`),
		...commonConstants,
		...pageConstants
	};
	if (pageData.PAGES) {
		pageData.CURRENT_PAGE = pageData.PAGES.find((item) => item.page === page);
	}
	return pageData;
};

module.exports = getPageData;
