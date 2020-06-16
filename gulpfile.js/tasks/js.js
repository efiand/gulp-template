const { src, dest } = require(`gulp`);
const { plumber, babel, uglify, rename } = require(`gulp-load-plugins`)();

const js = () => src(`source/js/entries/*.js`)
	.pipe(plumber())
	.pipe(require(`vinyl-named`)())
	.pipe(require(`webpack-stream`)({
		mode: `production`
	}, require(`webpack`)))
	.pipe(babel())
	.pipe(uglify({
		output: {
			comments: false
		}
	}))
	.pipe(rename({ suffix: `.min` }))
	.pipe(dest(`build/js`));

module.exports = js;
