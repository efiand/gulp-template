const { Paths } = require(`../constants`);
const { src, dest } = require(`gulp`);
const less = require(`gulp-less`);
const cssBase64 = require(`gulp-css-base64`);
const postcss = require(`gulp-postcss`);
const mqpacker = require(`mqpacker`);
const autoprefixer = require(`autoprefixer`);
const cssnano = require(`cssnano`);

const base64Config = {
	baseDir: `../../icons`, // Относительно точек входа сборки стилей
	extensionsAllowed: [`.svg`, `.png`],
	maxWeightResource: 10000
};

const compileCss = () => src(Paths.CSS_ENTRIES)
	.pipe(less())
	.pipe(postcss([mqpacker, autoprefixer, cssnano]))
	.pipe(cssBase64(base64Config))
	.pipe(dest(Paths.CSS_DEST));

module.exports = compileCss;
