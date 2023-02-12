import { isDev, isTest } from './common/constants.js';
import bundleScripts from 'gulp-esbuild';
import gulp from 'gulp';
import processSvelte from 'esbuild-svelte';
import server from 'browser-sync';
import useCondition from 'gulp-if';

const buildScripts = () =>
	gulp
		.src('source/scripts/main.js')
		.pipe(
			bundleScripts({
				bundle: true,
				format: 'iife',
				minify: !isDev,
				plugins: [
					processSvelte({
						compilerOptions: { hydratable: true }
					})
				]
			})
		)
		.pipe(useCondition(!isTest, gulp.dest('build/scripts')))
		.pipe(useCondition(isDev, server.stream()));

export default buildScripts;
