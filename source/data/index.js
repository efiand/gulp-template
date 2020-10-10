'use strict';

const commonData = require(`./common`);

module.exports = {
	get({ page }) {
		return {
			...commonData,
			CURRENT_PAGE: commonData.PAGES.find((item) => item.page === page),
			URL: `/${page}.html`
		};
	}
};
