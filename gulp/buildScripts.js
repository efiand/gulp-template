import { Path, devMode } from './constants.js';
import bundleScripts from 'gulp-esbuild';
import gulp from 'gulp';
import processSvelte from 'esbuild-svelte';

const bundle = (ENTRIES, DEST, ssr) =>
	gulp
		.src(ENTRIES)
		.pipe(
			bundleScripts({
				bundle: true,
				format: ssr ? 'esm' : 'iife',
				minify: !ssr && !devMode,
				plugins: [
					processSvelte({
						compilerOptions: {
							hydratable: !ssr,
							generate: ssr ? 'ssr' : 'dom'
						}
					})
				]
			})
		)
		.pipe(gulp.dest(DEST));

export const buildScripts = () => bundle(Path.Scripts.ENTRIES, Path.Scripts.DEST, false);
export const buildSvelteSsr = () => bundle(Path.Scripts.SSR_ENTRIES, Path.Scripts.SSR_DEST, true);
