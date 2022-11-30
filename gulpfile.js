import buildScripts from './gulp/buildScripts.js';
import buildSprite from './gulp/buildSprite.js';
import buildStyles from './gulp/buildStyles.js';
import buildSvg from './gulp/buildSvg.js';
import cleanDist from './gulp/cleanDist.js';
import copyStatic from './gulp/copyStatic.js';
import gulp from 'gulp';
import lintEditorconfig from './gulp/lintEditorconfig.js';
import lintScripts from './gulp/lintScripts.js';
import lintStyles from './gulp/lintStyles.js';
import optimizeImages from './gulp/optimizeImages.js';
import processLayouts from './gulp/processLayouts.js';
import startWatch from './gulp/startWatch.js';

const { parallel, series } = gulp;

export const lint = parallel(lintEditorconfig, lintScripts, lintStyles, processLayouts);
export const build = series(cleanDist, lint, parallel(buildScripts, buildSprite, buildStyles, buildSvg, optimizeImages, copyStatic));
export default series(build, startWatch);
