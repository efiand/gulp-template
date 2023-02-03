import gulp from 'gulp';
import { stacksvg } from 'gulp-stacksvg';

const buildSprite = () =>
	gulp
		.src('source/sprite/**/*.svg')
		.pipe(stacksvg({ output: 'sprite' }))
		.pipe(gulp.dest('build/images'));

export default buildSprite;
