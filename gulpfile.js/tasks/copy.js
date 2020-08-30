// Копирование не нуждающихся в обработке исходников в билд

const { src, dest } = require(`gulp`);
const { copySource, dist } = require(`../const`);

const copy = () => src(copySource)
	.pipe(dest(dist));

module.exports = copy;
