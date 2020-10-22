const { src, dest } = require(`gulp`);
const { plumber, imagemin } = require(`gulp-load-plugins`)();
const { config } = require(`pineglade-config`);
const { Sources, Dests } = require(`../const`);

const iconsmin = () => src(Sources.ICONS)
	.pipe(plumber())
	.pipe(imagemin([imagemin.svgo(config.SVGO)]))
	.pipe(dest(Dests.ICONS));

module.exports = iconsmin;
