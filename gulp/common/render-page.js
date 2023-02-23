import { isDev, isTest } from './constants.js';
import Twig from 'twig';
import bemLinter from 'posthtml-bem-linter';
import { createRenderer } from 'vue-server-renderer';
import htmlValidator from 'posthtml-w3c-validator';
import htmlnano from 'htmlnano';
import run from './run.js';

const minConfig = {
	collapseWhitespace: 'aggressive',
	minifySvg: false
};

Twig.cache(false);

const vueRenderer = createRenderer({
	runInNewContext: false
});

const createData = async ({ error = '', isHtml, pageName, status = '' }) => {
	let data = {
		app: {},
		error,
		isDev,
		isHtml,
		pageName,
		rootPath: pageName
			.split('/')
			.map(() => '')
			.join('../'),
		status: status.toString(),
		version: isDev ? `?${new Date().getTime()}` : ''
	};

	data = { ...data, ...(await run('data/main', data)) };
	data = { ...data, ...(await run(`data/pages/${pageName}`, data)) };

	const apps = Object.entries(global.appsConfig);
	if (data.isHtml && apps.length) {
		await Promise.all(
			apps.map(async ([appName, createApp]) => {
				const appData = data.appData[appName];

				if (createApp.render) {
					// Svelte or custom vanilla app detected
					const { head, html } = createApp.render({ appData });
					data.headCode = `${data.headCode || ''}${head}`;
					data.app[appName] = html;
				} else {
					// Vue detected
					const app = createApp({ appData });
					data.app[appName] = await vueRenderer.renderToString(app);
				}
			})
		);
	}

	return data;
};

const getTemplate = (data) =>
	new Promise((resolve, reject) => {
		Twig.renderFile(`./source/layouts/pages/${data.pageName}.twig`, data, (error, code) => {
			if (error) {
				reject(error);
			}

			resolve(code);
		});
	});

export default async (sourceName, payload = {}) => {
	let code = '';
	let error = '';
	const pageName = sourceName.replace(/\.twig$/, '');
	const isHtml = pageName.endsWith('.html');

	try {
		code = await getTemplate(await createData({ ...payload, isHtml, pageName }));

		if (isHtml) {
			const errors = [
				await htmlValidator.validateHtml({
					forceOffline: true,
					htmlCode: code,
					sourceName: pageName
				}),
				bemLinter.lintBem({
					content: code,
					logInPlace: false,
					name: pageName
				})
			].filter(Boolean);

			if (errors.length) {
				throw errors.join('\n');
			}

			if (!isDev) {
				code = (await htmlnano.process(code, minConfig)).html;
			}
		}
	} catch (err) {
		error = err.message || err;
		console.error(error);

		if (isTest) {
			process.exitCode = 1;
		}
	}

	return { code, error };
};
