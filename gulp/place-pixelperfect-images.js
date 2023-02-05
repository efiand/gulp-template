import clean from 'gulp-clean';
import createWebp from 'gulp-webp';
import gulp from 'gulp';
import optimizeImages from 'gulp-imagemin';
import optimizeJpeg from 'imagemin-mozjpeg';
import optimizePng from 'imagemin-pngquant';

const placePixelperfectImages = () =>
	gulp
		.src('source/place/pixelperfect/**/*.{jpg,png}')
		.pipe(optimizeImages([optimizePng(), optimizeJpeg({ progressive: true, quality: 75 })]))
		.pipe(clean())
		.pipe(createWebp({ quality: 75 }))
		.pipe(gulp.dest('source/static/pixelperfect'));

export default placePixelperfectImages;
