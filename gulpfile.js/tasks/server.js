const { series, watch } = require(`gulp`);
const tasks = require(`require-dir`)(`.`);
const { twighint, stylelint, eslint, copy, html, css, js, img, sprite } = tasks;
const browserSync = require(`browser-sync`).create();
const { COPY_SOURCE, DIST } = require(`../const`);

const extraOpts = process.env.NODE_ENV === `server` ? { proxy: `http://localhost:5000` } : { server: DIST };

const reload = (done) => {
	browserSync.reload();
	done();
};

const server = () => {
	browserSync.init({
		...extraOpts,
		cors: true,
		notify: false,
		ui: false
	});

	watch(`source/**/*.twig`, series(twighint, html, reload));
	watch(`source/less/**/*.less`, series(stylelint, css, reload));
	watch(`source/js/**/*.js`, series(eslint, js, reload));
	watch([`source/data/**/*.js`, `gulpfile.js/**/*.js`], series(eslint));
	watch(`source/sprite/*.svg`, series(sprite, css, reload));
	watch(`source/img/**/*.{svg,png,jpg}`, series(img, reload));
	watch(COPY_SOURCE, series(copy, reload));
};

module.exports = server;
