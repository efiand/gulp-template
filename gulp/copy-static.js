import gulp from 'gulp';

const copyStatic = () =>
	gulp
		.src(['source/static/**', '!source/static/pixelperfect/**', '!source/static/**/*.md'])
		.pipe(gulp.dest('build'));

export default copyStatic;
