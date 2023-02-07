import { isTest } from './common/constants.js';
import gulp from 'gulp';
import path from 'node:path';
import renderPage from './common/render-page.js';
import through2 from 'gulp-through2';
import useCondition from 'gulp-if';

// const pageName = path.replace(/\\/g, '/').replace(/^.*pages\/(.*)\.twig$/, '$1');

const buildPages = () =>
	gulp
		.src('source/layouts/pages/**/*.twig')
		.pipe(
			through2(async (content, file) => {
				const code = await renderPage(
					path.relative(`${process.cwd()}/source/layouts/pages`, file.path).replace(/\\+/g, '/')
				);

				file.extname = '';
				return code;
			})
		)
		.pipe(useCondition(!isTest, gulp.dest('build')));

export default buildPages;
