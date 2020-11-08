const { Paths } = require(`../constants`);
const config = require(`../../webpack.config`);
const { src, dest } = require(`gulp`);
const vinylNamed = require(`vinyl-named`);
const webpackStrean = require(`webpack-stream`);
const webpack = require(`webpack`);

const bundleJs = () => src(Paths.JS_ENTRIES)
	.pipe(vinylNamed())
	.pipe(webpackStrean(config, webpack))
	.pipe(dest(Paths.JS_DEST));

module.exports = bundleJs;
