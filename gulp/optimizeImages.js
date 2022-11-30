import { Path, devMode } from './constants.js';
import gulp from 'gulp';
import processImages from 'gulp-libsquoosh';
import useCondition from 'gulp-if';

const optimizeImages = () =>
	gulp.src(Path.Images.RASTERS)
		.pipe(useCondition(!devMode, processImages()))
		.pipe(gulp.dest(Path.Images.DEST))
		.pipe(processImages({ webp: { quality: 75 } }))
		.pipe(gulp.dest(Path.Images.DEST));

export default optimizeImages;
