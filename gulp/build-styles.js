import { isDev, isTest } from './common/constants.js';
import createAutoprefixes from 'autoprefixer';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import minifyCss from 'cssnano';
import processPostcss from 'gulp-postcss';
import sass from 'sass';
import server from 'browser-sync';
import sortMediaQueries from 'postcss-sort-media-queries';
import useCondition from 'gulp-if';

const postcssPlugins = [sortMediaQueries(), createAutoprefixes()];

// Изменение настроек в production-режиме
if (!isDev) {
	postcssPlugins.push(
		minifyCss({
			preset: ['default', { cssDeclarationSorter: false }]
		})
	);
}

const preprocessScss = gulpSass(sass);

const buildStyles = () =>
	gulp
		.src('source/styles/main.scss')
		.pipe(
			preprocessScss({}).on('error', function log(error) {
				preprocessScss.logError.bind(this)(error); // eslint-disable-line

				if (isTest) {
					process.exitCode = 1;
				} else if (!isDev) {
					throw new Error('');
				}
			})
		)
		.pipe(processPostcss(postcssPlugins))
		.pipe(useCondition(!isTest, gulp.dest('build/styles')))
		.pipe(useCondition(isDev, server.stream()));

export default buildStyles;
