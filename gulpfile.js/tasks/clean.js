// Очистка каталога билда перед сборкой

const { Dests } = require(`../const`);

const clean = () => require(`del`)(Dests.MAIN);

module.exports = clean;
