const { src, dest } = require(`gulp`);
const { plumber, imagemin } = require(`gulp-load-plugins`)();
const { Sources, Dests, Configs } = require(`../const`);

const iconsmin = () => src(Sources.ICONS)
	.pipe(plumber())
	.pipe(imagemin([imagemin.svgo(Configs.SVGO)]))
	.pipe(dest(Dests.ICONS));

module.exports = iconsmin;
