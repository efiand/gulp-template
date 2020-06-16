// Очистка каталога билда перед сборкой

const clean = () => require(`del`)(`build`);

module.exports = clean;
