const { Paths, EXPRESS_PORT } = require(`../constants`);
const express = require(`express`);
const { stat } = require(`fs`).promises;
const getPageData = require(`./get-page-data`);
const { StatusCodes } = require(`http-status-codes`);

const app = express();
app.set(`views`, Paths.TEMPLATES_SRC);
app.set(`view engine`, `twig`);
app.use(express.static(Paths.DEST));

app.use(async (req, res) => {
	const url = req.path.slice(1);
	if (!(/\.html/).test(url)) {
		res
			.status(StatusCodes.MOVED_PERMANENTLY)
			.redirect(`/${url}${!url || url.slice(-1) === `/` ? `` : `/`}index.html`);
		return;
	}

	try {
		const page = url.replace(/\.html$/, ``) || `index`;
		await stat(`${Paths.TEMPLATES_ENTRIES_SRC}/${page}.twig`);
		res
			.status(StatusCodes.OK)
			.render(`pages/${page}.twig`, getPageData(page));
	} catch (err) {
		res
			.status(StatusCodes.NOT_FOUND)
			.redirect(`/404.html`);
	}
});

app.listen(EXPRESS_PORT);
