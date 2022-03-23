import bemValidator from 'gulp-html-bem-validator';
import browsersync from 'browser-sync';
import clean from 'gulp-clean';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import lintspaces from 'gulp-lintspaces';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import postcss from 'gulp-postcss';
import posthtml from 'gulp-posthtml';
import rename from 'gulp-rename';
import stackSprite from 'gulp-svg-sprite';
import svgo from 'imagemin-svgo';
import svgoConfig from './svgo.config.js';
import vinylNamed from 'vinyl-named';
import webp from 'gulp-webp';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackStream from 'webpack-stream';

const { src, dest, watch, series, parallel } = gulp;
const server = browsersync.create();
const IS_DEV = process.env.NODE_ENV === 'development';
const checkLintspaces = () => lintspaces({
	editorconfig: '.editorconfig'
});

const Path = {
	Build: {
		CSS: ['source/styles/*.css'],
		JS: ['source/scripts/*.js']
	},
	DIST: 'public',
	Watch: {
		CSS: 'source/**/*.css',
		HTML: 'source/**/*.njk',
		ICONS_PLACE: 'place/icons/**/*.{svg,png}',
		IMG_DEST: 'public/images/**/*.{png,jpg}',
		IMG_PLACE: 'place/images/**/*.{svg,png,jpg}',
		JS: ['*.{js,cjs}', 'source/**/*.{js,cjs}'],
		PP: 'source/pixelperfect/*.{jpg,png,svg}',
		PP_PLACE: 'place/pixelperfect/**/*.{png,jpg}',
		SPRITE: 'source/icons/*.svg'
	}
};
if (!IS_DEV) {
	Path.Build.CSS.push('!source/styles/dev.css');
	Path.Build.JS.push('!source/scripts/dev.js');
}

const buildHTML = () => src('source/layouts/pages/**/*.njk')
	.pipe(posthtml())
	.pipe(bemValidator())
	.pipe(rename({ extname: '.html' }))
	.pipe(dest(Path.DIST));

const buildCSS = () => src(Path.Build.CSS)
	.pipe(postcss())
	.pipe(rename({ suffix: '.min' }))
	.pipe(dest(`${Path.DIST}/styles`));

const buildJS = () => src(Path.Build.JS)
	.pipe(vinylNamed())
	.pipe(webpackStream(webpackConfig, webpack))
	.pipe(dest(`${Path.DIST}/scripts`));

const optimizeImages = () => imagemin([
	svgo(svgoConfig),
	mozjpeg({
		progressive: true,
		quality: 75
	}),
	pngquant()
]);

const saveImages = () => src(Path.Watch.IMG_PLACE)
	.pipe(optimizeImages())
	.pipe(clean())
	.pipe(dest(`${Path.DIST}/images`));

const savePP = () => src(Path.Watch.PP_PLACE)
	.pipe(optimizeImages())
	.pipe(clean())
	.pipe(dest('source/pixelperfect'));

const createWebp = () => src(Path.Watch.IMG_DEST)
	.pipe(webp({ quality: 80 }))
	.pipe(dest(`${Path.DIST}/images`));

const optimizeIcons = () => src(Path.Watch.ICONS_PLACE)
	.pipe(optimizeImages())
	.pipe(clean())
	.pipe(dest('source/icons'));

const buildSprite = () => src(Path.Watch.SPRITE)
	.pipe(stackSprite({ mode: { stack: true } }))
	.pipe(rename('sprite.min.svg'))
	.pipe(dest(`${Path.DIST}/images`));

const testHTML = () => src(Path.Watch.HTML)
	.pipe(checkLintspaces())
	.pipe(lintspaces.reporter());

const testCSS = () => src(Path.Watch.CSS)
	.pipe(postcss())
	.pipe(checkLintspaces())
	.pipe(lintspaces.reporter());

const testJS = () => src(Path.Watch.JS)
	.pipe(eslint({
		fix: false
	}))
	.pipe(eslint.format())
	.pipe(checkLintspaces())
	.pipe(lintspaces.reporter());

const copyPP = () => src(Path.Watch.PP)
	.pipe(dest(`${Path.DIST}/pixelperfect`));

const reload = (done) => {
	server.reload();
	done();
};

const startServer = () => {
	server.init({
		cors: true,
		open: false,
		server: Path.DIST,
		ui: false
	});

	watch(Path.Watch.HTML, series(testHTML, buildHTML, reload));
	watch(Path.Watch.CSS, series(testCSS, buildCSS, reload));
	watch('source/layouts/**/*.js', series(testJS, buildHTML, reload));
	watch('source/{components,scripts,lib}/**/*.{js,cjs}', series(testJS, buildJS, reload));
	watch('*.{js,cjs}', testJS);
	watch(Path.Watch.PP_PLACE, savePP);
	watch(Path.Watch.IMG_PLACE, saveImages);
	watch(Path.Watch.IMG_DEST, series(createWebp, reload));
	watch(Path.Watch.ICONS_PLACE, series(optimizeIcons, buildCSS, reload));
	watch(Path.Watch.SPRITE, series(buildSprite, reload));
	watch(Path.Watch.PP, series(copyPP, reload));
};

const cleanDest = () => del([
	`${Path.DIST}/**/*.{html,css,js,webp}`,
	`${Path.DIST}/images/sprite.min.svg`,
	`${Path.DIST}/pixelperfect`
]);

export const test = parallel(testHTML, testCSS, testJS);
const prepare = parallel(test, cleanDest, saveImages, optimizeIcons);
const compile = parallel(buildHTML, buildCSS, buildJS, createWebp, buildSprite);
export const build = series(prepare, compile);
export default series(build, savePP, copyPP, startServer);
