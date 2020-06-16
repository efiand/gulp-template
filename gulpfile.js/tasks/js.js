const { src, dest } = require(`gulp`);
const { plumber, uglify, rename } = require(`gulp-load-plugins`)();
const { babel: babelConfig } = require(`../../package.json`);

const js = () => src(`source/js/entries/*.js`)
	.pipe(plumber())
	.pipe(require(`vinyl-named`)())
	.pipe(require(`webpack-stream`)({
		mode: `production`,
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: `babel-loader`,
						options: babelConfig
					}
				}
			]
		}
	}, require(`webpack`)))
	.pipe(uglify({
		output: {
			comments: false
		}
	}))
	.pipe(rename({ suffix: `.min` }))
	.pipe(dest(`build/js`));

module.exports = js;
