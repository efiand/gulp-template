const { Paths } = require(`../constants`);
const { config } = require(`pineglade-config`);
const { src, dest } = require(`gulp`);
const gulpData = require(`gulp-data`);
const twig = require(`gulp-twig`);
const htmlmin = require(`gulp-htmlmin`);
const validator = require(`gulp-w3c-html-validator`);
const getPageData = require(`../app/get-page-data`);

const getData = (file) => {
	const page = file.path.replace(/\\/g, `/`).replace(/^.*?twig\/pages\/(.*)\.twig$/, `$1`);
	return getPageData(page);
};

const compileHtml = () => src(Paths.TEMPLATES_ENTRIES)
	.pipe(gulpData(getData))
	.pipe(twig())
	.pipe(htmlmin(config.htmlmin))
	.pipe(dest(Paths.DEST))
	.pipe(validator())
	.pipe(validator.reporter());

module.exports = compileHtml;
