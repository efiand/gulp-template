// Копирование не нуждающихся в обработке исходников в билд

const { src, dest } = require(`gulp`);
const { Sources, Dests } = require(`../const`);

const copy = () => src(Sources.COPY)
	.pipe(dest(Dests.MAIN));

module.exports = copy;
