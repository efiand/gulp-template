const { src, dest } = require(`gulp`);
const { plumber, data, twig, htmlmin, w3cHtmlValidator } = require(`gulp-load-plugins`)();
const { Sources, Dests } = require(`../const`);
const { preparePageData } = require(`../utils`);

const html = () => src(Sources.HTML)
	.pipe(plumber())
	.pipe(data((file) => {
		const page = file.path.replace(/\\/g, `/`).replace(/^.*?twig\/pages\/(.*)\.twig$/, `$1`);
		return preparePageData(page);
	}))
	.pipe(twig())
	.pipe(htmlmin({
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		decodeEntities: true,
		html5: true,
		includeAutoGeneratedTags: false,
		minifyCSS: true,
		minifyJS: true,
		processConditionalComments: true,
		quoteCharacter: `"`,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		trimCustomFragments: true,
		useShortDoctype: true
	}))
	.pipe(dest(Dests.MAIN))
	.pipe(w3cHtmlValidator())
	.pipe(w3cHtmlValidator.reporter());

module.exports = html;
