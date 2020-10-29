const { src } = require(`gulp`);
const { htmlhint, lintspaces } = require(`gulp-load-plugins`)();
const { codeguide } = require(`pineglade-config`);

const testtwig = () => src(`source/twig/**/*.twig`)
	.pipe(htmlhint(codeguide.htmlhint))
	.pipe(htmlhint.reporter())
	.pipe(lintspaces({ editorconfig: `.editorconfig` }))
	.pipe(lintspaces.reporter());

module.exports = testtwig;
