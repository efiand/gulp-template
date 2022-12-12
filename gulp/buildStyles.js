import { Path, devMode } from './constants.js';
import { Breakpoint } from '../src/scripts/constants.js';
import { aliasify } from '../src/scripts/utils.js';
import createAutoprefixes from 'autoprefixer';
import sass from 'sass';
import { globby } from 'globby';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import minifyCss from 'cssnano';
import processPostcss from 'gulp-postcss';
import replace from 'gulp-replace';
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

const preprocessScss = gulpSass(sass);

const buildStyles = async () => {
	const bemBlocks = (await globby(Path.Styles.BLOCKS)).map((path) => {
		const block = path.replace(/^.*[\\\/](.*).scss$/, '$1');
		return `@import "../../components/${block}/${block}";`;
	});

	return gulp
		.src(Path.Styles.ENTRIES)
		.pipe(replace('@import "../../components/**/*";', bemBlocks.join('')))
		.pipe(
			preprocessScss({
				functions: {
					'aliasify($str)'(str) {
						return new sass.SassString(aliasify(str.getValue()));
					},
					'devMode()'() {
						return sass.types.Boolean[devMode ? 'TRUE' : 'FALSE'];
					},
					'getBreakpoint($breakpoint)'(breakpoint) {
						return new sass.types.Number(Breakpoint[breakpoint.getValue()]);
					}
				}
			}).on('error', preprocessScss.logError)
		)
		.pipe(processPostcss(postcssPlugins))
		.pipe(gulp.dest(Path.Styles.DEST));
};

export default buildStyles;
