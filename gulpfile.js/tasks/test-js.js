const { Paths, EDITORCONFIG } = require(`../constants`);
const { src } = require(`gulp`);
const eslint = require(`gulp-eslint`);
const editorconfig = require(`gulp-lintspaces`);

const testJs = () => src(Paths.JS_FILES)
	.pipe(eslint({ fix: false }))
	.pipe(eslint.format())
	.pipe(editorconfig(EDITORCONFIG))
	.pipe(editorconfig.reporter());

module.exports = testJs;
