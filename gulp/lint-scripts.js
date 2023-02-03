import eslint from 'gulp-eslint';
import gulp from 'gulp';
import { isDev } from './common/constants.js';
import useCondition from 'gulp-if';

const lintScripts = () =>
	gulp
		.src(['*.js', 'source/**/*.js'])
		.pipe(eslint({ fix: false }))
		.pipe(eslint.format())
		.pipe(useCondition(!isDev, eslint.failAfterError()));

export default lintScripts;
