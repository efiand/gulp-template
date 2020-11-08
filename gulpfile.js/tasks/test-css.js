const { Paths, EDITORCONFIG } = require(`../constants`);
const { src } = require(`gulp`);
const stylelint = require(`gulp-stylelint`);
const editorconfig = require(`gulp-lintspaces`);

const testCss = () => src(Paths.CSS_FILES)
	.pipe(stylelint({
		reporters: [{ console: true, formatter: `string` }]
	}))
	.pipe(editorconfig(EDITORCONFIG))
	.pipe(editorconfig.reporter());

module.exports = testCss;
