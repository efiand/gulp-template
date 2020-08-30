const { series, watch } = require(`gulp`);
const tasks = require(`require-dir`)(`.`);
const { twighint, stylelint, eslint, copy, html, css, js, img, sprite } = tasks;
const browserSync = require(`browser-sync`).create();
const { copySource, dist } = require(`../const`);

const opts = {
	cors: true,
	notify: false,
	port: 3000,
	ui: false
};
const ARG_DASHES_COUNT = 2;
const siteArg = process.argv.find((item) => {
	return item.slice(0, ARG_DASHES_COUNT) === `--` && item.length > ARG_DASHES_COUNT;
});
if (siteArg) {
	// Пример запуска с проксированием домена (Open Server etc.): `yarn start -- --mylocaldomain.dev`
	opts.proxy = `https://${siteArg.slice(ARG_DASHES_COUNT)}`;
} else {
	opts.server = dist;
}

const reload = (done) => {
	browserSync.reload();
	done();
};

const server = () => {
	browserSync.init(opts);

	watch(`source/**/*.twig`, series(twighint, html, reload));
	watch(`source/less/**/*.less`, series(stylelint, css, reload));
	watch(`source/js/**/*.js`, series(eslint, js, reload));
	watch([`source/data/**/*.js`, `gulpfile.js/**/*.js`], series(eslint));
	watch(`source/sprite/*.svg`, series(sprite, reload));
	watch(`source/img/**/*.{svg,png,jpg}`, series(img, reload));
	watch(copySource, series(copy, reload));
};

module.exports = server;
