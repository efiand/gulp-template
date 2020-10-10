const { src, dest } = require(`gulp`);
const { plumber, imagemin, svgstore, rename } = require(`gulp-load-plugins`)();
const { Sources, Dests, Configs } = require(`../const`);

const sprite = () => src(Sources.SPRITE)
	.pipe(plumber())
	.pipe(imagemin([imagemin.svgo(Configs.SVGO)]))
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename(`sprite.min.svg`))
	.pipe(dest(Dests.IMG));

module.exports = sprite;
