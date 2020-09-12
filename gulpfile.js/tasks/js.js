const { src, dest } = require(`gulp`);
const { plumber } = require(`gulp-load-plugins`)();
const { DIST } = require(`../const`);

const js = () => src(`source/js/entries/*.js`)
	.pipe(plumber())
	.pipe(require(`vinyl-named`)())
	.pipe(require(`webpack-stream`)(require(`../../webpack.config`), require(`webpack`)))
	.pipe(dest(`${DIST}/js`));

module.exports = js;
