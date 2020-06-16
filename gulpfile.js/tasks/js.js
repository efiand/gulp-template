const { src, dest } = require(`gulp`);
const { plumber } = require(`gulp-load-plugins`)();
const { babel: babelConfig } = require(`../../package.json`);
const TerserPlugin = require(`terser-webpack-plugin`);

const js = () => src(`source/js/entries/*.js`)
	.pipe(plumber())
	.pipe(require(`vinyl-named`)())
	.pipe(require(`webpack-stream`)({
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
	}, require(`webpack`)))
	.pipe(dest(`build/js`));

module.exports = js;
