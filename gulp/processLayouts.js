import { Path, devMode } from './constants.js';
import createHtml from 'gulp-twig';
import getData from 'gulp-data';
import gulp from 'gulp';
import processHtml from 'gulp-posthtml';
import punctify from '../src/scripts/utils/punctify.js';
import useCondition from 'gulp-if';

const lintMode = Boolean(process.env.LINT);

const twigConfig = {
	filters: [
		{
			func: punctify,
			name: 'punctify'
		},
		{
			func(str, [pattern]) {
				return str.includes(pattern);
			},
			name: 'includes'
		}
	],
	functions: [
		{
			func(name) {
				const relative = name.slice(0, 1) === '~' ? '../components/' : '';
				const Component = name.replace(/^~/, '');

				return `../${relative}${Component}/${Component}.twig`;
			},
			name: 'component'
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

const renderWidget = async (widget, data = {}, { version }) => {
	if (data.spaOnly) {
		return `<div data-widget="${widget}"></div>`;
	}

	const Widget = (await import(`../.temp/svelte-ssr/${widget}.js${version}`)).default;
	return Widget.render({ data }).html;
};

const createData = async ({ path }) => {
	const page = path.replace(/\\/g, '/').replace(/^.*entries\/(.*)\.twig$/, '$1');
	const versionId = new Date().getTime();
	const rootPath = page
		.split('/')
		.map(() => '')
		.join('../');

	let data = {
		body: `${rootPath}../../components/Page/Page.twig`,
		devMode,
		page,
		pageData: {
			devMode,
			page,
			rootPath
		},
		rendered: {},
		rootPath,
		version: devMode ? `?${versionId}` : '',
		widgets: []
	};

	data = await enrichData(data, 'main');
	data = await enrichData(data, `entries/${page}`);

	await Promise.all(
		data.widgets.map(async ([widget, widgetData]) => {
			data.rendered[widget] = await renderWidget(widget, widgetData, data);
		})
	);

	data.pageData.widgets = data.widgets ? data.widgets.filter(([widget, { ssrOnly } = {}]) => !ssrOnly) : [];
	data.pageData = JSON.stringify(data.pageData);

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
