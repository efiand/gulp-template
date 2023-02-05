import lintEditorconfig, { EDITORCONFIG_FILES } from './lint-editorconfig.js';
import buildPages from './build-pages.js';
import buildScripts from './build-scripts.js';
import buildSprite from './build-sprite.js';
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
import server from 'browser-sync';

const reload = (done) => {
	server.reload();
	done();
};

const watch = () => {
	server.init({
		reloadThrottle: 500,
		server: ['build', 'source/static']
	});

	gulp.watch(EDITORCONFIG_FILES, lintEditorconfig);
	gulp.watch(['*.md', '{gulp,source}/**/*.md'], lintMarkdown);
	gulp.watch('*.js', lintScripts);
	gulp.watch('source/**/*.js', gulp.parallel(buildScripts, lintScripts));
	gulp.watch('source/{data,layouts}/**/*.{js,twig}', gulp.series(buildPages, reload));
	gulp.watch('source/place/favicons/**/*.{png,svg}', placeFavicons);
	gulp.watch('source/place/images/**/*.{jpg,png,svg}', placeImages);
	gulp.watch('source/place/pixelperfect/**/*.{jpg,png}', placePixelperfectImages);
	gulp.watch('source/place/sprite/**/*.svg', placeSpriteIcons);
	gulp.watch('source/sprite/**/*.svg', gulp.series(buildSprite, reload));
	gulp.watch(['source/static/**', '!source/static/images/**/*.{jpg,png}'], reload);
	gulp.watch('source/static/images/**/*.{jpg,png}', gulp.series(buildWebp, reload));
	gulp.watch('source/styles/**/*.scss', gulp.parallel(buildStyles, lintStyles));
};

export default watch;
