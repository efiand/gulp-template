const { src, dest } = require(`gulp`);
const { plumber, rename } = require(`gulp-load-plugins`)();
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
		}
	}, require(`webpack`)))
	.pipe(rename({ suffix: `.min` }))
	.pipe(dest(`build/js`));

module.exports = js;
