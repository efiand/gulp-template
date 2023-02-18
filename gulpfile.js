import { isDev, isTest } from './gulp/common/constants.js';
import buildPages from './gulp/build-pages.js';
import buildScripts from './gulp/build-scripts.js';
import buildSprite from './gulp/build-sprite.js';
import buildSsrScript from './gulp/build-ssr-script.js';
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
import placePixelperfectImages from './gulp/place-pixelperfect-images.js';
import placeSpriteIcons from './gulp/place-sprite-icons.js';
import watch from './gulp/watch.js';

const cleanOnStart = () => deleteAsync('build');
const cleanOnEnd = () => deleteAsync('build/scripts/apps');

const lint = gulp.parallel(lintEditorconfig, lintMarkdown, lintScripts, lintStyles);

const test = gulp.series(
	buildSsrScript,
	gulp.parallel(lint, buildPages, buildScripts, buildStyles),
	cleanOnEnd
);

const build = gulp.series(
	cleanOnStart,
	gulp.parallel(
		buildScripts,
		buildSsrScript,
		buildStyles,
		lint,
		placeFavicons,
		placeImages,
		placePixelperfectImages,
		placeSpriteIcons
	),
	gulp.parallel(buildSprite, buildWebp),
	isDev ? watch : gulp.parallel(buildPages, copyStatic),
	cleanOnEnd
);

export default isTest ? test : build;
