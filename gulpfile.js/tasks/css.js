const { src, dest } = require(`gulp`);
const { plumber, less, postcss, rename } = require(`gulp-load-plugins`)();
const { dist } = require(`../const`);

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
	.pipe(dest(`${dist}/css`));

module.exports = css;
