// Копирование не нуждающихся в обработке исходников в билд

const { src, dest } = require(`gulp`);
const { copySource } = require(`../const`);

const copy = () => src(copySource)
	.pipe(dest(`build`));

module.exports = copy;
