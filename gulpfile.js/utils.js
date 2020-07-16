module.exports = {
	getJSON(src, { isDev, page }) {
		let data = {};
		try {
			const dataSrc = require(src);
			if (typeof dataSrc.get === `function`) {
				data = dataSrc.get({ isDev, page });
			} else {
				data = dataSrc;
			}
		} catch (err) {
			data = {};
		}
		return data;
	}
};
