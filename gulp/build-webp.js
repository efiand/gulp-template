import createWebp from 'gulp-webp';
import gulp from 'gulp';

const buildWebp = () =>
	gulp
		.src('source/static/images/**/*.{jpg,png}')
		.pipe(createWebp({ quality: 75 }))
		.pipe(gulp.dest('build/images'));

export default buildWebp;
