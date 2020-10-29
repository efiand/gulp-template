const { src, dest } = require(`gulp`);
const { imagemin, svgstore, rename } = require(`gulp-load-plugins`)();
const { config } = require(`pineglade-config`);
const { Sources, Dests } = require(`../const`);

const sprite = () => src(Sources.SPRITE)
	.pipe(imagemin([imagemin.svgo(config.svgo)]))
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename(`sprite.min.svg`))
	.pipe(dest(Dests.IMG));

module.exports = sprite;
