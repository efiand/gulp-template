import { Path } from './constants.js';
import clean from 'gulp-clean';
import gulp from 'gulp';
import minifySvg from 'gulp-svgmin';

const saveSvg = () => gulp.src(Path.Images.VECTORS).pipe(minifySvg()).pipe(clean()).pipe(gulp.dest(Path.Images.PUBLIC));

export default saveSvg;
