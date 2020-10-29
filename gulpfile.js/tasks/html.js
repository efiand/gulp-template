const { src, dest } = require(`gulp`);
const { data, twig, htmlmin, w3cHtmlValidator } = require(`gulp-load-plugins`)();
const { config } = require(`pineglade-config`);
const { Sources, Dests } = require(`../const`);
const { preparePageData } = require(`../utils`);

const html = () => src(Sources.HTML)
	.pipe(data((file) => {
		const page = file.path.replace(/\\/g, `/`).replace(/^.*?twig\/pages\/(.*)\.twig$/, `$1`);
		return preparePageData(page);
	}))
	.pipe(twig())
	.pipe(htmlmin(config.htmlmin))
	.pipe(dest(Dests.MAIN))
	.pipe(w3cHtmlValidator())
	.pipe(w3cHtmlValidator.reporter());

module.exports = html;
