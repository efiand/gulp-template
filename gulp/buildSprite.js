import { Path, devMode } from './constants.js';
import gulp from 'gulp';
import minifySvg from 'gulp-svgmin';
import { stacksvg } from 'gulp-stacksvg';
import useCondition from 'gulp-if';

const buildSprite = () =>
	gulp.src(Path.ICONS)
		.pipe(useCondition(!devMode, minifySvg()))
		.pipe(stacksvg({ output: 'icons' }))
		.pipe(gulp.dest(Path.Images.DEST));

export default buildSprite;
