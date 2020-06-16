const { src, dest } = require(`gulp`);
const { plumber, less, postcss, rename } = require(`gulp-load-plugins`)();

const css = () => src(`source/less/entries/*.less`)
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		require(`mqpacker`),
		require(`autoprefixer`),
		require(`cssnano`)
	]))
	.pipe(rename({
		suffix: `.min`
	}))
	.pipe(dest(`build/css`));

module.exports = css;
