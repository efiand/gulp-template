const { babel: babelConfig } = require(`./package.json`);
const TerserPlugin = require(`terser-webpack-plugin`);

module.exports = {
	mode: `production`,
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: {
					loader: `babel-loader`,
					options: babelConfig
				}
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true
			})
		]
	},
	output: {
		filename: `[name].min.js`
	}
};
