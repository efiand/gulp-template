import { isDev, isTest } from './common/constants.js';
import createHtml from 'gulp-twig';
import getData from 'gulp-data';
import gulp from 'gulp';
import processHtml from 'gulp-posthtml';
import useCondition from 'gulp-if';

const run = async (fileName, data = {}) => {
	if (typeof data.version === 'undefined') {
		data.version = data.isDev ? `?${new Date().getTime()}` : '';
	}

	try {
		return {
			...data,
			...(await (await import(`../source/data/${fileName}.js${data.version}`)).default(data))
		};
	} catch (error) {
		if (error.code !== 'ENOENT') {
			console.error(error.message || error);
			process.exitCode = 1;
		}

		return data;
	}
};

const createData = async ({ path }) => {
	const pageName = path.replace(/\\/g, '/').replace(/^.*pages\/(.*)\.twig$/, '$1');
	const started = {
		isDev,
		pageName,
		rootPath: pageName
			.split('/')
			.map(() => '')
			.join('../'),
		version: isDev ? `?${new Date().getTime()}` : ''
	};

	return await run(`pages/${pageName}`, await run('main', started));
};

const buildPages = () =>
	gulp
		.src('source/layouts/pages/**/*.twig')
		.pipe(getData(createData))
		.pipe(createHtml())
		.pipe(processHtml())
		.pipe(useCondition(!isTest, gulp.dest('build')));

export default buildPages;
