import { Path, devMode } from './constants.js';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import useCondition from 'gulp-if';

const lintScripts = () =>
	gulp.src(Path.Scripts.ALL)
		.pipe(eslint({ fix: false }))
		.pipe(eslint.format())
		.pipe(useCondition(!devMode, eslint.failAfterError()));

export default lintScripts;
