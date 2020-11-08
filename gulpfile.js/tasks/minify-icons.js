const { Paths } = require(`../constants`);
const { config } = require(`pineglade-config`);
const { src, dest } = require(`gulp`);
const imagemin = require(`gulp-imagemin`);

const minifyIcons = () => src(Paths.ICONS)
	.pipe(imagemin([
		imagemin.svgo(config.svgo),
		imagemin.optipng()
	]))
	.pipe(dest(Paths.ICONS_SRC));

module.exports = minifyIcons;
