import { Path, devMode } from './constants.js';
import createHtml from 'gulp-twig';
import getData from 'gulp-data';
import gulp from 'gulp';
import processHtml from 'gulp-posthtml';
import useCondition from 'gulp-if';

const lintMode = Boolean(process.env.LINT);

const enrichData = async (data, fileName) => {
	try {
		return {
			...data,
			...(await import(`../src/data/${fileName}.js${data.version}`)).default(data)
		};
	} catch (error) {
		if (error.code !== 'ERR_MODULE_NOT_FOUND') {
			console.error(error);
		}

		return data;
	}
};

const createData = async ({ path }) => {
	const page = path.replace(/\\/g, '/').replace(/^.*entries\/(.*)\.twig$/, '$1');
	const started = {
		devMode,
		page,
		rootPath: page
			.split('/')
			.map(() => '')
			.join('../'),
		version: devMode ? `?${new Date().getTime()}` : ''
	};

	let data = await enrichData(started, 'main');
	data = await enrichData(data, `entries/${page}`);

	const { head, html } = (await import(`../.temp/svelte-ssr/Page.js${data.version}`)).default.render({ data });

	return {
		...started,
		head,
		html,
		pageData: data.clientData ? JSON.stringify(data.clientData) : null
	};
};

// Задача обработки HTML
const processLayouts = () =>
	gulp
		.src(Path.Layouts.ENTRIES)
		.pipe(getData(createData))
		.pipe(createHtml())
		.pipe(processHtml())
		.pipe(useCondition(!lintMode, gulp.dest(Path.DEST)));

export default processLayouts;
