import { Path, devMode } from './constants.js';
import gulp from 'gulp';
import lintspaces from 'gulp-lintspaces';

const lintEditorconfig = () =>
	gulp.src(Path.EDITORCONFIG)
		.pipe(lintspaces({ editorconfig: '.editorconfig' }))
		.pipe(lintspaces.reporter({ breakOnWarning: !devMode }));

export default lintEditorconfig;
