const { src, dest } = require(`gulp`);
const { Sources, Dests } = require(`../const`);

const js = () => src(Sources.JS)
	.pipe(require(`vinyl-named`)())
	.pipe(require(`webpack-stream`)(require(`../../webpack.config`), require(`webpack`)))
	.pipe(dest(Dests.JS));

module.exports = js;
