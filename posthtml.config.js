const { getPosthtmlBemLinter } = require('posthtml-bem-linter');
const { getPosthtmlW3cValidator } = require('posthtml-w3c-validator');

const getSourceName = (filename) => filename.replace(/\\/g, '/').replace(/^.*entries\/(.*)$/, '$1');

const devMode = process.env.NODE_ENV === 'development';
const plugins = [
	getPosthtmlW3cValidator({
		exit: !devMode,
		forceOffline: true,
		getSourceName
	}),
	getPosthtmlBemLinter({
		getSourceName,
		modifier: '_'
	})
];

// Изменение настроек в production-режиме
if (!devMode) {
	const minifyHtml = require('htmlnano');
	const render = require('posthtml-render');
	const parser = require('posthtml-parser');

	plugins.push(minifyHtml({ collapseWhitespace: 'aggressive', minifySvg: false }));
	plugins.push(
		(() => async (tree) => {
			// Доводка после минификации
			const html = render(tree)
				.replace(/\/dt><dd/g, '/dt> <dd') // Инлайновые <dt> и <dd>, важен пробел между ними
				.replace(/\/dd><dt/g, '/dd> <dt'); // И между <dd> и <dt> тоже важен

			return parser(html);
		})()
	);
}

module.exports = { plugins };
