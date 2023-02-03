import createAutoprefixes from 'autoprefixer';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import { isDev } from './common/constants.js';
import minifyCss from 'cssnano';
import processPostcss from 'gulp-postcss';
import sass from 'sass';
import server from 'browser-sync';
import sortMediaQueries from 'postcss-sort-media-queries';

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
		.pipe(preprocessScss().on('error', preprocessScss.logError))
		.pipe(processPostcss(postcssPlugins))
		.pipe(gulp.dest('build/styles'))
		.pipe(server.stream());

export default buildStyles;
