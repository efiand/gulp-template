const { Paths, IMG_QUALITY } = require(`../constants`);
const { config } = require(`pineglade-config`);
const { src, dest } = require(`gulp`);
const imagemin = require(`gulp-imagemin`);
const jpegoptim = require(`imagemin-jpegoptim`);

const minifyImg = () => src(Paths.IMG_RAW_FILES)
	.pipe(imagemin([
		imagemin.svgo(config.svgo),
		imagemin.optipng(),
		jpegoptim({ max: IMG_QUALITY, progressive: true })
	]))
	.pipe(dest(Paths.IMG_SRC));

module.exports = minifyImg;
