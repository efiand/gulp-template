import gulp from 'gulp';
import lint from 'gulp-remark-lint';
import remarkLintEmphasisMarker from 'remark-lint-emphasis-marker';
import remarkLintListItemIndent from 'remark-lint-list-item-indent';

const lintMarkdown = () =>
	gulp.src(['*.md', '{gulp,source}/**/*.md']).pipe(
		lint([
			[remarkLintEmphasisMarker, '_'],
			[remarkLintListItemIndent, 'space']
		])
	);

export default lintMarkdown;
