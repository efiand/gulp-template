const { src } = require(`gulp`);
const { plumber, eslint, lintspaces } = require(`gulp-load-plugins`)();
const { Sources, Configs } = require(`../const`);

const testjs = () => src(Sources.TEST_JS)
	.pipe(plumber())
	.pipe(eslint({ fix: false }))
	.pipe(eslint.format())
	.pipe(lintspaces(Configs.LINTSPACES))
	.pipe(lintspaces.reporter());

module.exports = testjs;
