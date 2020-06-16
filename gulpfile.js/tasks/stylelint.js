const { src } = require(`gulp`);
const { plumber, stylelint: stylelintPlugin, lintspaces } = require(`gulp-load-plugins`)();

const stylelint = () => src(`source/less/**/*.less`)
	.pipe(plumber())
	.pipe(stylelintPlugin({
		reporters: [
			{
				console: true,
				formatter: `string`
			}
		]
	}))
	.pipe(lintspaces({
		editorconfig: `.editorconfig`
	}))
	.pipe(lintspaces.reporter());

module.exports = stylelint;
