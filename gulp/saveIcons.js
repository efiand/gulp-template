import { Path } from './constants.js';
import clean from 'gulp-clean';
import gulp from 'gulp';
import minifySvg from 'gulp-svgmin';

const saveIcons = () => gulp.src(Path.Images.ICONS_SRC).pipe(minifySvg()).pipe(clean()).pipe(gulp.dest(Path.Images.ICONS_DEST));

export default saveIcons;
