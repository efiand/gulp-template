// Очистка каталога билда перед сборкой

const { dist } = require(`../const`);

const clean = () => require(`del`)(dist);

module.exports = clean;
