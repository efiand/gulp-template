const { src } = require(`gulp`);
const { plumber, eslint: eslintPlugin, lintspaces } = require(`gulp-load-plugins`)();
const { ESLINT_SOURCE } = require(`../const`);

const eslint = () => src(ESLINT_SOURCE)
	.pipe(plumber())
	.pipe(eslintPlugin({
		fix: false
	}))
	.pipe(eslintPlugin.format())
	.pipe(lintspaces({
		editorconfig: `.editorconfig`
	}))
	.pipe(lintspaces.reporter());

module.exports = eslint;
