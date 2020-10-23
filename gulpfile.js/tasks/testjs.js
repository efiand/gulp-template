const { src } = require(`gulp`);
const { if: gulpIf, plumber, eslint, lintspaces } = require(`gulp-load-plugins`)();
const { isDev, Sources, Configs } = require(`../const`);

const testjs = () => src(Sources.TEST_JS)
	.pipe(gulpIf(isDev, plumber()))
	.pipe(eslint({ fix: false }))
	.pipe(eslint.format())
	.pipe(lintspaces(Configs.LINTSPACES))
	.pipe(lintspaces.reporter());

module.exports = testjs;
