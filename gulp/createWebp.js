import { Path } from './constants.js';
import gulp from 'gulp';
import processImages from 'gulp-libsquoosh';

const createWebp = () =>
	gulp
		.src(Path.Images.WEBP)
		.pipe(processImages({ webp: { quality: 75 } }))
		.pipe(gulp.dest(Path.Images.DEST));

export default createWebp;
