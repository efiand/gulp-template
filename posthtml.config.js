const { getPosthtmlBemLinter } = require('posthtml-bem-linter');
const { getPosthtmlW3cValidator } = require('posthtml-w3c-validator');
const minifyHtml = require('htmlnano');

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
	plugins.push(minifyHtml({ collapseWhitespace: 'aggressive', minifySvg: false }));
}

module.exports = { plugins };
