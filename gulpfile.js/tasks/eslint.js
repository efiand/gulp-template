const { src } = require(`gulp`);
const { plumber, eslint: eslintPlugin, lintspaces } = require(`gulp-load-plugins`)();
const { eslintSource } = require(`../const`);

const eslint = () => src(eslintSource)
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
