const { src, dest } = require(`gulp`);
const { plumber, imagemin, svgstore, rename } = require(`gulp-load-plugins`)();
const { SVGO_CONFIG } = require(`../const`);

const sprite = () => src(`source/sprite/*.svg`)
	.pipe(plumber())
	.pipe(imagemin([imagemin.svgo(SVGO_CONFIG)]))
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename(`sprite.min.svg`))
	.pipe(dest(`build/img`));

module.exports = sprite;
