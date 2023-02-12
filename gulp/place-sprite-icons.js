import clean from 'gulp-clean';
import gulp from 'gulp';
import optimizeImages from 'gulp-imagemin';
import optimizeSvg from 'imagemin-svgo';
import svgoConfig from '../svgo.config.js';

const placeSpriteIcons = () =>
	gulp
		.src('source/place/sprite/**/*.svg')
		.pipe(optimizeImages([optimizeSvg(svgoConfig)]))
		.pipe(clean())
		.pipe(gulp.dest('source/sprite'));

export default placeSpriteIcons;
