const { src } = require(`gulp`);
const { plumber, htmlhint, lintspaces } = require(`gulp-load-plugins`)();
const { codeguide } = require(`pineglade-config`);

const testtwig = () => src(`source/twig/**/*.twig`)
	.pipe(plumber())
	.pipe(htmlhint(codeguide.htmlhint))
	.pipe(htmlhint.reporter())
	.pipe(lintspaces({ editorconfig: `.editorconfig` }))
	.pipe(lintspaces.reporter());

module.exports = testtwig;
