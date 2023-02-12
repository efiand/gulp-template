import { isDev, isTest } from './constants.js';
import Twig from 'twig';
import bemLinter from 'posthtml-bem-linter';
import htmlValidator from 'posthtml-w3c-validator';
import htmlnano from 'htmlnano';
import run from './run.js';

const minConfig = {
	collapseWhitespace: 'aggressive',
	minifySvg: false
};

Twig.cache(false);

const createData = async ({ error = '', isHtml, pageName, status = null }) => {
	let data = {
		appData: {
			error,
			pageName,
			status
		},
		error,
		isDev,
		isHtml,
		pageName,
		rootPath: pageName
			.split('/')
			.map(() => '')
			.join('../'),
		version: isDev ? `?${new Date().getTime()}` : ''
	};

	data = { ...data, ...(await run('data/main', data)) };
	data = { ...data, ...(await run(`data/pages/${pageName}`, data)) };

	if (data.isHtml && global.app) {
		const { head, html } = global.app.render(data);
		data.headCode = head;
		data.appCode = html;
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
