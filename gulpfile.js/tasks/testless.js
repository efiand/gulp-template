const { src } = require(`gulp`);
const { stylelint, lintspaces } = require(`gulp-load-plugins`)();
const { Sources, Configs } = require(`../const`);

const testless = () => src(Sources.TEST_LESS)
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
