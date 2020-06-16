const { src, dest } = require(`gulp`);
const { plumber } = require(`gulp-load-plugins`)();

const js = () => src(`source/js/entries/*.js`)
	.pipe(plumber())
	.pipe(require(`vinyl-named`)())
	.pipe(require(`webpack-stream`)(require(`../../webpack.config`), require(`webpack`)))
	.pipe(dest(`build/js`));

module.exports = js;
