export const devMode = process.env.NODE_ENV === 'development';

export const Path = {
	DEST: 'build',
	EDITORCONFIG: ['src/**/*.{js,md,twig,scss,svg}', '*.{js,json,md}'],
	ICONS: 'src/icons/**/*.svg',
	Images: {
		DEST: 'build/images',
		RASTERS: ['src/images/**/*.{jpg,png}', 'src/pixelperfect/**/*.{jpg,png}'],
		VECTORS: 'src/images/**/*.svg'
	},
	Layouts: {
		ALL: 'src/{data,layouts}/**/*.{js,twig}',
		ENTRIES: 'src/layouts/pages/**/*.twig'
	},
	MARKDOWN: ['*.md', 'src/**/*.md'],
	STATIC: 'src/static/**',
	Scripts: {
		ALL: ['src/{data,scripts}/**/*.{js,svelte}', '*.js'],
		DEST: 'build/scripts',
		ENTRIES: ['src/scripts/*.js']
	},
	Styles: {
		ALL: 'src/styles/**/*.scss',
		DEST: 'build/styles',
		ENTRIES: 'src/styles/*.scss'
	}
};

// Изменение настроек в production-режиме
if (!devMode) {
	Path.Scripts.ENTRIES.push('!src/scripts/dev.js');
	Path.Images.RASTERS.pop();
}
