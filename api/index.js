import { API_URL, HOST, PORT } from './common/const.js';
import { createServer } from 'http';
import { getPageData } from './common/util.js';
import { promises } from 'fs';

createServer(async (req, res) => {
	const page = req.url.slice(1) || 'index';
	const data = await getPageData(page);

	res.setHeader('Content-Type', 'application/json');
	res.writeHead(data.statusCode);
	res.end(JSON.stringify(data));
})
	.listen(PORT, HOST, async () => {
		if (process.env.NODE_ENV === 'development') {
			const message = `API is running at ${new Date().toISOString()} on ${API_URL}`;

			await promises.writeFile('./api/restart.log', message);
		}
	});
