const { Paths } = require(`../constants`);
const { src, dest } = require(`gulp`);
const svgstore = require(`gulp-svgstore`);

const compileSprite = () => src(Paths.ICONS_SPRITE)
	.pipe(svgstore({ inlineSvg: true }))
	.pipe(dest(Paths.IMG_DEST));

module.exports = compileSprite;
