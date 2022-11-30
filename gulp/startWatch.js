import { Path } from './constants.js';
import buildScripts from './buildScripts.js';
import buildSprite from './buildSprite.js';
import buildStyles from './buildStyles.js';
import buildSvg from './buildSvg.js';
import copyStatic from './copyStatic.js';
import gulp from 'gulp';
import lintEditorconfig from './lintEditorconfig.js';
import lintScripts from './lintScripts.js';
import lintStyles from './lintStyles.js';
import optimizeImages from './optimizeImages.js';
import processLayouts from './processLayouts.js';
import server from 'browser-sync';

const { parallel, series, watch } = gulp;

const reloadServer = (done) => {
	server.reload();
	done();
};

const startWatch = () => {
	server.init({ server: Path.DEST });

	watch(Path.EDITORCONFIG, lintEditorconfig);
	watch(Path.ICONS, series(buildSprite, reloadServer));
	watch(Path.Images.RASTERS, series(optimizeImages, reloadServer));
	watch(Path.Images.VECTORS, series(buildSvg, reloadServer));
	watch(Path.Layouts.ALL, series(processLayouts, reloadServer));
	watch(Path.Scripts.ALL, parallel(series(buildScripts, reloadServer), lintScripts));
	watch(Path.STATIC, series(copyStatic, reloadServer));
	watch(Path.Styles.ALL, parallel(series(buildStyles, reloadServer), lintStyles));
};

export default startWatch;
