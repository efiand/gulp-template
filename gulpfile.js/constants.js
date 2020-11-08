const Paths = {
	AS_IS_FILES: [`source/as-is/**/.*`, `source/as-is/**/*.*`],
	CSS_DEST: `build/css`,
	CSS_ENTRIES: `source/less/entries/*.less`,
	CSS_FILES: `source/less/**/*.less`,
	DATA_COMMON_SRC: `source/data/common`,
	DATA_PAGES_SRC: `source/data/pages`,
	DEST: `build`,
	ICONS: `source/icons/**/*.{svg,png}`,
	ICONS_SPRITE: `source/icons/sprite/**/*.svg`,
	ICONS_SRC: `source/icons`,
	IMG_DEST: `build/img`,
	IMG_FILES: `source/as-is/img/**/*.{jpg,png,svg}`,
	IMG_RAW_FILES: `source/img/**/*.{jpg,png,svg}`,
	IMG_SRC: `source/as-is/img`,
	JS_DEST: `build/js`,
	JS_ENTRIES: `source/js/entries/*.js`,
	JS_FILES: [`source/js/**/*.js`, `gulpfile.js/**/*.js`],
	PAGES_FILES: [`source/twig/**/*.twig`, `source/data/**/*.{js,json}`],
	TEMPLATES_ENTRIES: `source/twig/pages/**/*.twig`,
	TEMPLATES_ENTRIES_SRC: `source/twig/pages`,
	TEMPLATES_FILES: `source/twig/**/*.twig`,
	TEMPLATES_SRC: `source/twig`
};

module.exports = {
	DEV_PORT: 3333,
	EDITORCONFIG: { editorconfig: `.editorconfig` },
	EXPRESS_PORT: 5555,
	IMG_QUALITY: 80,
	PROXY: `http://localhost:5555`,
	Paths,
	isDev: process.env.NODE_ENV === `development`
};
