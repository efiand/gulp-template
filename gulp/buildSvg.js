import { Path, devMode } from './constants.js';
import gulp from 'gulp';
import minifySvg from 'gulp-svgmin';
import useCondition from 'gulp-if';

const buildSvg = () => gulp.src(Path.Images.VECTORS).pipe(useCondition(!devMode, minifySvg())).pipe(gulp.dest(Path.Images.DEST));

export default buildSvg;
