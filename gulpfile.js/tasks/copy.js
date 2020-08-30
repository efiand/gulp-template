// Копирование не нуждающихся в обработке исходников в билд

const { src, dest } = require(`gulp`);
const { COPY_SOURCE, DIST } = require(`../const`);

const copy = () => src(COPY_SOURCE)
	.pipe(dest(DIST));

module.exports = copy;
