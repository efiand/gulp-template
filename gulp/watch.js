import { STATIC_FILES, StatusCode } from './common/constants.js';
import lintEditorconfig, { EDITORCONFIG_FILES } from './lint-editorconfig.js';
import buildScripts from './build-scripts.js';
import buildSprite from './build-sprite.js';
import buildSsrScript from './build-ssr-script.js';
import buildStyles from './build-styles.js';
import buildWebp from './build-webp.js';
import gulp from 'gulp';
import lintMarkdown from './lint-markdown.js';
import lintScripts from './lint-scripts.js';
import lintStyles from './lint-styles.js';
import placeFavicons from './place-favicons.js';
import placeImages from './place-images.js';
import placePixelperfectImages from './place-pixelperfect-images.js';
import placeSpriteIcons from './place-sprite-icons.js';
import renderPage from './common/render-page.js';
import server from 'browser-sync';

const reload = (done) => {
	server.reload();
	done();
};

const watch = () => {
	server.init({
		async middleware({ url }, res, next) {
			if (STATIC_FILES.some((ext) => url.includes(`.${ext}`)) && !url.includes('/api/')) {
				return next();
			}

			const { code, error } = await renderPage(`${url.slice(1) || 'index.html'}.twig`);

			if (error) {
				const status = StatusCode[error.includes('Unable to find') ? 'NOT_FOUND' : 'ERROR'];
				res.writeHead(status);

				try {
					const { code: errorPageCode } = await renderPage('404.html.twig', {
						error,
						status
					});
					return res.end(errorPageCode);
				} catch (secondaryError) {
					return res.end(error);
				}
			}

			return res.end(code);
		},
		reloadThrottle: 500,
		server: ['build', 'source/static']
	});

	gulp.watch(EDITORCONFIG_FILES, lintEditorconfig);
	gulp.watch(['*.md', '{gulp,source}/**/*.md'], lintMarkdown);
	gulp.watch(['.eslintrc', '*.js', '{gulp,source}/**/*.{js,svelte,vue}'], lintScripts);
	gulp.watch(
		'source/scripts/**/*.{js,svelte,vue}',
		gulp.series(gulp.parallel(buildScripts, buildSsrScript), reload)
	);
	gulp.watch('source/{data,layouts}/**/*.{js,twig}', reload);
	gulp.watch('source/place/favicons/**/*.{png,svg}', placeFavicons);
	gulp.watch('source/place/images/**/*.{jpg,png,svg}', placeImages);
	gulp.watch('source/place/pixelperfect/**/*.{jpg,png}', placePixelperfectImages);
	gulp.watch('source/place/sprite/**/*.svg', placeSpriteIcons);
	gulp.watch('source/sprite/**/*.svg', gulp.series(buildSprite, reload));
	gulp.watch(['source/static/**', '!source/static/images/**/*.{jpg,png}'], reload);
	gulp.watch('source/static/images/**/*.{jpg,png}', gulp.series(buildWebp, reload));
	gulp.watch(['.stylelintrc', 'source/styles/**/*.scss'], gulp.parallel(buildStyles, lintStyles));
};

export default watch;
