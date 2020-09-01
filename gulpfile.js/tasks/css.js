const { src, dest } = require(`gulp`);
const { cssBase64, less, plumber, postcss, rename } = require(`gulp-load-plugins`)();
const { DIST } = require(`../const`);

const css = () => src(`source/less/entries/*.less`)
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		require(`mqpacker`),
		require(`autoprefixer`),
		require(`cssnano`)
	]))
	.pipe(cssBase64({
		baseDir: `../../sprite`,
		extensionsAllowed: [
			`.svg`,
			`.png`
		],
		maxWeightResource: 10000
	}))
	.pipe(rename({
		suffix: `.min`
	}))
	.pipe(dest(`${DIST}/css`));

module.exports = css;
