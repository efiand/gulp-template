const { src } = require(`gulp`);
const { plumber, htmlhint, lintspaces } = require(`gulp-load-plugins`)();

const twighint = () => src(`source/twig/**/*.twig`)
	.pipe(plumber())
	.pipe(htmlhint({
		'alt-require': true,
		'attr-lowercase': [
			`preserveAspectRatio`,
			`viewBox`
		],
		'attr-no-duplication': true,
		'attr-unsafe-chars': true,
		'attr-value-double-quotes': true,
		'attr-value-not-empty': false,
		'doctype-first': false,
		'doctype-html5': true,
		'href-abs-or-rel': false,
		'id-class-ad-disabled': false,
		'id-class-value': false,
		'id-unique': true,
		'inline-script-disabled': false,
		'inline-style-disabled': false,
		'space-tab-mixed-disabled': `tab`,
		'spec-char-escape': false,
		'src-not-empty': true,
		'style-disabled': false,
		'tag-pair': true,
		'tag-self-close': false,
		'tagname-lowercase': true,
		'title-require': true
	}))
	.pipe(htmlhint.reporter())
	.pipe(lintspaces({
		editorconfig: `.editorconfig`
	}))
	.pipe(lintspaces.reporter());

module.exports = twighint;
