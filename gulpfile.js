import { buildScripts, buildSvelteSsr } from './gulp/buildScripts.js';
import buildSprite from './gulp/buildSprite.js';
import buildStyles from './gulp/buildStyles.js';
import cleanDist from './gulp/cleanDist.js';
import copyStatic from './gulp/copyStatic.js';
import createWebp from './gulp/createWebp.js';
import gulp from 'gulp';
import lintEditorconfig from './gulp/lintEditorconfig.js';
import lintScripts from './gulp/lintScripts.js';
import lintStyles from './gulp/lintStyles.js';
import processLayouts from './gulp/processLayouts.js';
import saveIcons from './gulp/saveIcons.js';
import saveImages from './gulp/saveImages.js';
import saveSvg from './gulp/saveSvg.js';
import startWatch from './gulp/startWatch.js';

const { parallel, series } = gulp;

export const lint = parallel(lintEditorconfig, lintScripts, lintStyles, series(buildSvelteSsr, processLayouts));

const compile = series(
	cleanDist,
	parallel(lint, saveIcons, saveImages, saveSvg),
	parallel(buildScripts, buildSprite, buildStyles, copyStatic)
);

export const build = series(compile, createWebp);
export default series(compile, startWatch);
