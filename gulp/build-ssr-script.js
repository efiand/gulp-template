import bundleScripts from 'gulp-esbuild';
import gulp from 'gulp';
import processSvelte from 'esbuild-svelte';
import through2 from 'gulp-through2';

const buildSsrScript = () =>
	gulp
		.src('source/scripts/blocks/page.svelte', { allowEmpty: true })
		.pipe(
			bundleScripts({
				bundle: true,
				format: 'esm',
				plugins: [
					processSvelte({
						compilerOptions: { generate: 'ssr' }
					})
				]
			})
		)
		.pipe(gulp.dest('build/scripts'))
		.pipe(
			through2(async () => {
				global.app = (await import('../build/scripts/page.js')).default;
			})
		);

export default buildSsrScript;
