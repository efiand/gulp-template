// Копирование не нуждающихся в обработке исходников в билд

const { Paths } = require(`../constants`);
const { src, dest } = require(`gulp`);

const copyAsIs = () => src(Paths.AS_IS_FILES)
	.pipe(dest(Paths.DEST));

module.exports = copyAsIs;
