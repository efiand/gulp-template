const { src, dest } = require(`gulp`);
const { cssBase64, less, postcss, rename } = require(`gulp-load-plugins`)();
const { Sources, Dests, Configs } = require(`../const`);

const css = () => src(Sources.CSS)
	.pipe(less())
	.pipe(postcss([
		require(`autoprefixer`),
		require(`cssnano`)
	]))
	.pipe(cssBase64({
		baseDir: `../../icons`,
		extensionsAllowed: [
			`.svg`,
			`.png`
		],
		maxWeightResource: 10000
	}))
	.pipe(rename(Configs.RENAME))
	.pipe(dest(Dests.CSS));

module.exports = css;
