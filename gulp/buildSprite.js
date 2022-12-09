import { Path } from './constants.js';
import gulp from 'gulp';
import { stacksvg } from 'gulp-stacksvg';

const buildSprite = () =>
	gulp
		.src(Path.ICONS)
		.pipe(stacksvg({ output: 'icons' }))
		.pipe(gulp.dest(Path.Images.DEST));

export default buildSprite;
