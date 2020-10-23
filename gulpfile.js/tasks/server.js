const { series, watch } = require(`gulp`);
const tasks = require(`require-dir`)(`.`);
const { testtwig, testless, testjs, copy, html, css, js, img, sprite } = tasks;
const express = require(`express`);
const browserSync = require(`browser-sync`).create();
const { stat } = require(`fs`).promises;
const { preparePageData } = require(`../utils`);
const { Sources, Dests, Paths, isDev } = require(`../const`);
const DEFAULT_PORT = 5000;
const HttpCode = {
	NOT_FOUND: 404,
	OK: 200
};

if (isDev) {
	const app = express();
	app.set(`views`, `./${Paths.TWIG}`);
	app.set(`view engine`, `twig`);
	app.use(express.static(Dests.MAIN));

	app.use(async (req, res) => {
		const page = req.path.slice(1).replace(/\.html$/, ``) || `index`;
		try {
			await stat(`./${Paths.TWIG_PAGES}/${page}.twig`);
			res
				.status(HttpCode.OK)
				.render(`pages/${page}`, preparePageData(page));
		} catch (err) {
			res
				.status(HttpCode.NOT_FOUND)
				.redirect(`/404.html`);
		}
	});

	app.listen(DEFAULT_PORT);
}

const reload = (done) => {
	browserSync.reload();
	done();
};

const server = () => {
	browserSync.init({
		cors: true,
		notify: false,
		proxy: `http://localhost:${DEFAULT_PORT}`,
		ui: false
	});

	watch(Sources.HTML, reload);
	watch(Sources.TEST_TWIG, series(testtwig, html, reload));
	watch(Sources.TEST_LESS, series(testless, css, reload));
	watch(Paths.JS_GLOB, series(testjs, js, reload));
	watch(Paths.GULP_GLOB, series(testjs));
	watch(Sources.ICONS, series(sprite, css, reload));
	watch(Sources.IMG, series(img, reload));
	watch(Sources.COPY, series(copy, reload));
};

module.exports = server;
