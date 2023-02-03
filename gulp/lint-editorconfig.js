import gulp from 'gulp';
import { isDev } from './common/constants.js';
import lintspaces from 'gulp-lintspaces';

export const EDITORCONFIG_FILES = [
	'.*',
	'*.{json,md}',
	'!package-lock.json',
	'source/**/*.{md,svg,twig}',
	'!source/place/**'
];

const lintEditorconfig = () =>
	gulp
		.src(EDITORCONFIG_FILES)
		.pipe(lintspaces({ editorconfig: '.editorconfig' }))
		.pipe(lintspaces.reporter({ breakOnWarning: !isDev }));

export default lintEditorconfig;
