import { Path, devMode } from './constants.js';
import gulp from 'gulp';
import processPostcss from 'gulp-postcss';
import processStylelint from 'stylelint';
import reportStylelint from 'postcss-reporter';
import scssSyntax from 'postcss-scss';

const lintStyles = () =>
	gulp.src(Path.Styles.ALL).pipe(
		processPostcss(
			[
				processStylelint(),
				reportStylelint({
					clearAllMessages: true,
					throwError: !devMode
				})
			],
			{ syntax: scssSyntax }
		)
	);

export default lintStyles;
