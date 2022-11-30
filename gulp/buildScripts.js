import { Path, devMode } from './constants.js';
import bundleScripts from 'gulp-esbuild';
import gulp from 'gulp';

const buildScripts = () =>
	gulp
		.src(Path.Scripts.ENTRIES)
		.pipe(
			bundleScripts({
				bundle: true,
				minify: !devMode
			})
		)
		.pipe(gulp.dest(Path.Scripts.DEST));

export default buildScripts;
