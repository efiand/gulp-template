import gulp from 'gulp';
import { isDev } from './common/constants.js';
import processPostcss from 'gulp-postcss';
import processStylelint from 'stylelint';
import report from 'postcss-reporter';
import scssSyntax from 'postcss-scss';

const lintStyles = () =>
	gulp.src('source/styles/**/*.scss').pipe(
		processPostcss(
			[
				processStylelint(),
				report({
					clearAllMessages: true,
					throwError: !isDev
				})
			],
			{ syntax: scssSyntax }
		)
	);

export default lintStyles;
