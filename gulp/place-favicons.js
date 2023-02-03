import clean from 'gulp-clean';
import gulp from 'gulp';
import optimizeImages from 'gulp-imagemin';
import optimizeJpeg from 'imagemin-mozjpeg';
import optimizePng from 'imagemin-pngquant';
import optimizeSvg from 'imagemin-svgo';
import svgoConfig from '../svgo.config.js';

const placeFavicons = () =>
	gulp
		.src('source/place/favicons/**/*.{png,svg}')
		.pipe(
			optimizeImages([
				optimizePng(),
				optimizeJpeg({ progressive: true, quality: 75 }),
				optimizeSvg(svgoConfig)
			])
		)
		.pipe(clean())
		.pipe(gulp.dest('source/static'));

export default placeFavicons;
