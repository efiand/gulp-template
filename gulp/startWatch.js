import { buildScripts, buildSvelteSsr} from './buildScripts.js';
import { Path } from './constants.js';
import buildSprite from './buildSprite.js';
import buildStyles from './buildStyles.js';
import copyStatic from './copyStatic.js';
import gulp from 'gulp';
import lintEditorconfig from './lintEditorconfig.js';
import lintScripts from './lintScripts.js';
import lintStyles from './lintStyles.js';
import processLayouts from './processLayouts.js';
import saveIcons from './saveIcons.js';
import saveImages from './saveImages.js';
import saveSvg from './saveSvg.js';
import server from 'browser-sync';

const { parallel, series, watch } = gulp;

const reloadServer = (done) => {
	server.reload();
	done();
};

const startWatch = () => {
	server.init({ server: Path.DEST });

	const buildSsr = series(buildSvelteSsr, processLayouts);

	watch(Path.EDITORCONFIG, lintEditorconfig);
	watch(Path.ICONS, series(buildSprite, reloadServer));
	watch(Path.Images.ICONS_SRC, saveIcons);
	watch(Path.Images.RASTERS, saveImages);
	watch(Path.Images.VECTORS, saveSvg);
	watch(Path.Layouts.ALL, series(buildSsr, reloadServer));
	watch(Path.STATIC, series(copyStatic, reloadServer));
	watch(Path.Scripts.ALL, series(parallel(buildSsr, buildScripts), reloadServer));
	watch(Path.Scripts.LINTABLE, lintScripts);
	watch(Path.Styles.ALL, parallel(lintStyles, series(buildStyles, reloadServer)));
};

export default startWatch;
