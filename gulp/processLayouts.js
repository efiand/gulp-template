import { Path, devMode } from './constants.js';
import createHtml from 'gulp-twig';
import getData from 'gulp-data';
import gulp from 'gulp';
import processHtml from 'gulp-posthtml';
import useCondition from 'gulp-if';

const lintMode = Boolean(process.env.LINT);

const twigConfig = {
	filters: [
		{
			func(str, args) {
				const [sign = '.'] = args || [];

				if (/(\.|\?|!|,|:|…)$/.test(str)) {
					return str;
				}
				return `${str}${sign}`;
			},
			name: 'punctify'
		}
	]
};

const enrichData = async (data, fileName) => {
	try {
		return {
			...data,
			...(await import(`../src/data/${fileName}.js${data.version}`)).default(data)
		};
	} catch (error) {
		return data;
	}
};

const createData = async ({ path }) => {
	const page = path.replace(/\\/g, '/').replace(/^.*pages\/(.*)\.twig$/, '$1');
	const versionId = new Date().getTime();
	const rootPath = page
		.split('/')
		.map(() => '')
		.join('../');

	let data = {
		devMode,
		page,
		rootPath,
		theme: `${rootPath}../themes/default.twig`,
		version: devMode ? `?${versionId}` : ''
	};

	data = await enrichData(data, 'common');
	data = await enrichData(data, `pages/${page}`);

	return data;
};

// Задача обработки HTML
const processLayouts = () =>
	gulp
		.src(Path.Layouts.ENTRIES)
		.pipe(getData(createData))
		.pipe(createHtml(twigConfig))
		.pipe(processHtml())
		.pipe(useCondition(!lintMode, gulp.dest(Path.DEST)));

export default processLayouts;
