const { src } = require(`gulp`);
const { if: gulpIf, plumber, htmlhint, lintspaces } = require(`gulp-load-plugins`)();
const { codeguide } = require(`pineglade-config`);
const { isDev } = require(`../const`);

const testtwig = () => src(`source/twig/**/*.twig`)
	.pipe(gulpIf(isDev, plumber()))
	.pipe(htmlhint(codeguide.htmlhint))
	.pipe(htmlhint.reporter())
	.pipe(lintspaces({ editorconfig: `.editorconfig` }))
	.pipe(lintspaces.reporter());

module.exports = testtwig;
