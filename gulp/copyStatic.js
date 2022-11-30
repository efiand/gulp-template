import { Path } from './constants.js';
import gulp from 'gulp';

const copyStatic = () => gulp.src(Path.STATIC).pipe(gulp.dest(Path.DEST));

export default copyStatic;
