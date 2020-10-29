const { src, dest } = require(`gulp`);
const { imagemin } = require(`gulp-load-plugins`)();
const { config } = require(`pineglade-config`);
const { Sources, Dests } = require(`../const`);

const iconsmin = () => src(Sources.ICONS)
	.pipe(imagemin([imagemin.svgo(config.svgo)]))
	.pipe(dest(Dests.ICONS));

module.exports = iconsmin;
