const { getPosthtmlBemLinter } = require('posthtml-bem-linter');
const { getPosthtmlW3cValidator } = require('posthtml-w3c-validator');

const getSourceName = (filename) => filename.replace(/\\/g, '/').replace(/^.*pages\/(.*)$/, '$1');

const isDev = process.argv.includes('--dev');

const plugins = [
	getPosthtmlW3cValidator({
		exit: !isDev,
		forceOffline: true,
		getSourceName
	}),
	getPosthtmlBemLinter({
		getSourceName
	})
];

const getTool = (toolName) => {
	const tool = require(`posthtml-${toolName}`);
	return typeof tool === 'function' ? tool : tool[toolName];
};

// Изменение настроек в production-режиме
if (!isDev) {
	const minifyHtml = require('htmlnano');
	const render = getTool('render');
	const parser = getTool('parser');

	plugins.push(minifyHtml({ collapseWhitespace: 'aggressive', minifySvg: false }));
	plugins.push(
		(() => (tree) => {
			// Доводка после минификации
			const html = render(tree)
				.replace(/\/dt><dd/g, '/dt> <dd')
				.replace(/\/dd><dt/g, '/dd> <dt');

			return parser(html);
		})()
	);
}

module.exports = { plugins };
