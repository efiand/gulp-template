// Очистка каталога билда перед сборкой

const { Paths } = require(`../constants`);
const del = require(`del`);

const cleanDist = () => del(Paths.DEST);

module.exports = cleanDist;
