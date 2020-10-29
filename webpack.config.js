const { babel } = require(`./package.json`);

module.exports = {
	mode: `production`,
	module: {
		rules: [{
			test: /\.js$/,
			use: { loader: `babel-loader`, options: babel }
		}]
	},
	optimization: { minimize: true },
	output: { filename: `[name].min.js` }
};
