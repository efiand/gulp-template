import clean from 'gulp-clean';
import gulp from 'gulp';
import optimizeImages from 'gulp-imagemin';
import optimizeJpeg from 'imagemin-mozjpeg';
import optimizePng from 'imagemin-pngquant';
import optimizeSvg from 'imagemin-svgo';
import svgoConfig from '../svgo.config.js';

const placeImages = () =>
	gulp
		.src('source/place/images/**/*.{jpg,png,svg}')
		.pipe(
			optimizeImages([
				optimizePng(),
				optimizeJpeg({ progressive: true, quality: 75 }),
				optimizeSvg(svgoConfig)
			])
		)
		.pipe(clean())
		.pipe(gulp.dest('source/static/images'));

export default placeImages;
