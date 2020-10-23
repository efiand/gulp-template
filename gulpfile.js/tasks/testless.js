const { src } = require(`gulp`);
const { if: gulpIf, plumber, stylelint, lintspaces } = require(`gulp-load-plugins`)();
const { isDev, Sources, Configs } = require(`../const`);

const testless = () => src(Sources.TEST_LESS)
	.pipe(gulpIf(isDev, plumber()))
	.pipe(stylelint({
		reporters: [
			{
				console: true,
				formatter: `string`
			}
		]
	}))
	.pipe(lintspaces(Configs.LINTSPACES))
	.pipe(lintspaces.reporter());

module.exports = testless;
