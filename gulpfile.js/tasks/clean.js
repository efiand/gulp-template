// Очистка каталога билда перед сборкой

const { DIST } = require(`../const`);

const clean = () => require(`del`)(DIST);

module.exports = clean;
