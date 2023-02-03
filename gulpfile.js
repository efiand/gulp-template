import { isDev, isTest } from './gulp/common/constants.js';
import buildPages from './gulp/build-pages.js';
import buildScripts from './gulp/build-scripts.js';
import buildSprite from './gulp/build-sprite.js';
import buildStyles from './gulp/build-styles.js';
import buildWebp from './gulp/build-webp.js';
import copyStatic from './gulp/copy-static.js';
import { deleteAsync } from 'del';
import gulp from 'gulp';
import lintEditorconfig from './gulp/lint-editorconfig.js';
import lintMarkdown from './gulp/lint-markdown.js';
import lintScripts from './gulp/lint-scripts.js';
import lintStyles from './gulp/lint-styles.js';
import placeFavicons from './gulp/place-favicons.js';
import placeImages from './gulp/place-images.js';
import placeSpriteIcons from './gulp/place-sprite-icons.js';
import watch from './gulp/watch.js';

const clean = () => deleteAsync('build');

const lint = gulp.parallel(lintEditorconfig, lintMarkdown, lintScripts, lintStyles);

const build = gulp.series(
	clean,
	gulp.parallel(
		buildPages,
		buildScripts,
		buildStyles,
		lint,
		placeFavicons,
		placeImages,
		placeSpriteIcons
	),
	gulp.parallel(buildSprite, buildWebp),
	isDev ? watch : copyStatic
);

export default isTest ? gulp.parallel(lint, buildPages) : build;
