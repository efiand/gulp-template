export const devMode = process.env.NODE_ENV === 'development';

export const CWD = process.cwd().replace(/\\+/g, '/');

export const DEST = devMode ? 'dev' : 'build';

export const Path = {
	DEST,
	EDITORCONFIG: ['{gulp,src}/**/*.{js,md,twig,scss,svelte,svg}', '*.{js,json,md}'],
	ICONS: 'src/icons/**/*.svg',
	Images: {
		DEST: `${DEST}/images`,
		ICONS_DEST: 'src/icons',
		ICONS_SRC: '.temp/icons/**/*.svg',
		PUBLIC: 'public/images',
		RASTERS: '.temp/images/**/*.{jpg,png}',
		VECTORS: '.temp/images/**/*.svg',
		WEBP: 'public/images/**/*.{jpg,png}'
	},
	Layouts: {
		ALL: 'src/{components,data,layouts}/**/*.{js,svelte,twig}',
		ENTRIES: 'src/layouts/entries/**/*.twig'
	},
	MARKDOWN: ['*.md', 'src/**/*.md'],
	STATIC: ['public/**'],
	Scripts: {
		ALL: 'src/{components,data,scripts}/**/*.{js,svelte}',
		DEST: `${DEST}/scripts`,
		ENTRIES: ['src/scripts/entries/*.js'],
		LINTABLE: ['src/{components,data,scripts}/**/*.{js,svelte}', 'gulp/**/*.js', '*.js'],
		SSR_DEST: '.temp/svelte-ssr',
		SSR_ENTRIES: 'src/components/Page.svelte'
	},
	Styles: {
		ALL: 'src/{components,styles}/**/*.scss',
		DEST: `${DEST}/styles`,
		ENTRIES: 'src/styles/entries/**/*.scss'
	}
};

// Изменение настроек в production-режиме
if (!devMode) {
	Path.Scripts.ENTRIES.push('!src/scripts/entries/dev.js');
	Path.STATIC.push('!public/pixelperfect/**');
}
