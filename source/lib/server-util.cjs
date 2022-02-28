const { HtmlValidate } = require('html-validate');
const Util = require('./util.cjs');
const WithExtension = require('@allmarkedup/nunjucks-with');
const chalk = require('chalk');
const fetch = require('node-fetch');
const { log } = console;
const nunjucks = require('nunjucks');
const { readFile } = require('fs').promises;

const validateHtml = new HtmlValidate();
const SeverityLevel = {
	error: 2,
	info: 1
};
const Severity = {
	1: {
		logOutput: chalk.yellow.bold,
		title: 'WARNING'
	},
	2: {
		logOutput: chalk.red.bold,
		title: 'ERROR'
	}
};
const W3C_TIMEOUT = 1000;

module.exports = {
	log,
	async modifyData(filePath, payload = {}) {
		let data = {
			errors: [],
			...payload
		};

		try {
			const handleData = await readFile(filePath, 'utf-8');
			data = {
				...data,
				...Util.applyDataWithFn(handleData, data)
			};
		} catch (err) {
			data.errors.push(err);
		}

		return data;
	},
	renderNjk(template = '', data = {}) {
		const env = nunjucks.configure('source', { autoescape: false });

		env.addExtension('WithExtension', new WithExtension());

		env.addGlobal('getContext', function getContext(key = null, global = false) {
			const ctx = global ? data : this.ctx; // eslint-disable-line
			return key ? ctx[key] : ctx;
		});
		env.addGlobal('getComponentPath', (componentName) => `components/${componentName}/${componentName}.njk`);

		env.addFilter('keys', Object.keys);
		for (const utilName of Object.keys(Util)) {
			env.addFilter(utilName, Util[utilName]);
		}

		return nunjucks.renderString(template, data);
	},
	async validateHtml(html, page) {
		let output = '';
		const controller = new AbortController();
		setTimeout(() => {
			controller.abort();
		}, W3C_TIMEOUT);

		try {
			// Онлайн-валидатор HTML

			const validRes = await fetch('https://validator.nu/?out=json', {
				body: html,
				headers: { 'Content-Type': 'text/html' },
				method: 'POST',
				signal: controller.signal
			});
			const { messages = [] } = await validRes.json();
			messages.forEach(({ extract, firstColumn, lastLine, message, type }) => {
				const { logOutput, title } = Severity[SeverityLevel[type]];
				const prefix = `\n[${chalk.cyan('Validate HTML Online')}] ${page} (${lastLine}:${firstColumn + 1})`;
				const selectorMsg = ` ${chalk.cyan(extract)}`;

				output += `${prefix}${selectorMsg}:\n${logOutput.underline(title)}: ${logOutput(message)}\n`;
			});
		} catch (err) {
			// Оффлайн-валидатор HTML

			const report = validateHtml.validateString(html, require('../../.htmlvalidate.json'));

			report.results.forEach(({ messages }) => {
				messages.forEach(({ column, line, message, selector, severity }) => {
					if (Severity[severity]) {
						const { logOutput, title } = Severity[severity];
						const prefix = `\n[${chalk.cyan('Validate HTML Offline')}] ${page} (${line}:${column})`;
						const selectorMsg = selector ? ` ${chalk.cyan(selector)}` : '';

						output += `${prefix}${selectorMsg}:\n${logOutput.underline(title)}: ${logOutput(message)}\n`;
					}
				});
			});
		}

		return output;
	}
};
