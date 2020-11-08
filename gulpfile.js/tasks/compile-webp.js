const { Paths, IMG_QUALITY } = require(`../constants`);
const { src, dest } = require(`gulp`);
const webp = require(`gulp-webp`);

const compileWebp = () => src(Paths.IMG_FILES)
	.pipe(webp({ quality: IMG_QUALITY }))
	.pipe(dest(Paths.IMG_DEST));

module.exports = compileWebp;
