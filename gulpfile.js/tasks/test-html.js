const { Paths, EDITORCONFIG } = require(`../constants`);
const { codeguide } = require(`pineglade-config`);
const { src } = require(`gulp`);
const htmlhint = require(`gulp-htmlhint`);
const editorconfig = require(`gulp-lintspaces`);

const testHtml = () => src(Paths.TEMPLATES_FILES)
	.pipe(htmlhint(codeguide.htmlhint))
	.pipe(htmlhint.reporter())
	.pipe(editorconfig(EDITORCONFIG))
	.pipe(editorconfig.reporter());

module.exports = testHtml;
