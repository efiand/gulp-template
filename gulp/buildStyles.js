import { Path, devMode } from './constants.js';
import createAutoprefixes from 'autoprefixer';
import dartSass from 'sass';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import minifyCss from 'cssnano';
import processPostcss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';

const postcssPlugins = [sortMediaQueries(), createAutoprefixes()];

// Изменение настроек в production-режиме
if (!devMode) {
	postcssPlugins.push(
		minifyCss({
			preset: ['default', { cssDeclarationSorter: false }]
		})
	);
}

const preprocessScss = gulpSass(dartSass);

const buildStyles = () =>
	gulp
		.src(Path.Styles.ENTRIES)
		.pipe(preprocessScss().on('error', preprocessScss.logError))
		.pipe(processPostcss(postcssPlugins))
		.pipe(gulp.dest(Path.Styles.DEST));

export default buildStyles;
