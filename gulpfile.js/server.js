const express = require(`express`);
const { DIST, HttpCode } = require(`./const`);
const { preparePageData } = require(`./utils`);
const { stat } = require(`fs`).promises;
const DEFAULT_PORT = 5000;
const app = express();

app.set(`views`, `./source/twig/pages`);
app.set(`view engine`, `twig`);
app.use(express.static(DIST));

app.use(async (req, res) => {
	const page = req.path.slice(1).replace(/\.html$/, ``) || `index`;
	try {
		await stat(`./source/twig/pages/${page}.twig`);
		res
			.status(HttpCode.OK)
			.render(page, preparePageData(page));
	} catch (err) {
		res
			.status(HttpCode.NOT_FOUND)
			.redirect(`/404.html`);
	}
});

app.listen(DEFAULT_PORT);
