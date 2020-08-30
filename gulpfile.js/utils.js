module.exports = {
	getJSON(src, { isDev, page }) {
		try {
			const dataSrc = require(src);
			if (typeof dataSrc.get === `function`) {
				return dataSrc.get({ isDev, page });
			}
			return dataSrc;
		} catch (err) {
			return {};
		}
	}
};
