const Paths = {
	AS_IS: `source/as-is`,
	BUILD: `build`,
	ICONS: `source/icons`,
	JS: `source/js`,
	LESS: `source/less`,
	TWIG: `source/twig`
};
Paths.GULP_GLOB = `gulpfile.js/**/*.js`;
Paths.JS_GLOB = `${Paths.JS}/**/*.js`;
Paths.TWIG_PAGES = `${Paths.TWIG}/pages`;

const Configs = {
	LINTSPACES: {
		editorconfig: `.editorconfig`
	},
	RENAME: {
		suffix: `.min`
	}
};

const Sources = {
	COPY: [
		`${Paths.AS_IS}/**/.*`,
		`${Paths.AS_IS}/**/*.*`
	],
	CSS: `${Paths.LESS}/style.less`,
	CSS_ICONS: `${Paths.ICONS}/css/**/*.{svg,png}`,
	DATA: `source/data`,
	HTML: `${Paths.TWIG_PAGES}/**/*.twig`,
	ICONS: `${Paths.ICONS}/**/*.{svg,png}`,
	IMG: `source/img/**/*.{svg,png,jpg}`,
	JS: `${Paths.JS}/script.js`,
	SPRITE: `${Paths.ICONS}/sprite/**/*.svg`,
	TEST_JS: [
		Paths.GULP_GLOB,
		Paths.JS_GLOB
	],
	TEST_LESS: `${Paths.LESS}/**/*.less`,
	TEST_TWIG: `${Paths.TWIG}/**/*.twig`
};

const Dests = {
	CSS: `${Paths.BUILD}/css`,
	ICONS: Paths.ICONS,
	IMG: `${Paths.BUILD}/img`,
	JS: `${Paths.BUILD}/js`,
	MAIN: Paths.BUILD
};

module.exports = {
	Configs,
	Dests,
	Paths,
	Sources,
	isDev: process.env.NODE_ENV === `development`
};
