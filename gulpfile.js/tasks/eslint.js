const { src } = require(`gulp`);
const { plumber, eslint: eslintPlugin, lintspaces } = require(`gulp-load-plugins`)();

const eslint = () => src([`source/**/*.js`, `gulpfile.js/**/*.js`])
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
