const render = require('posthtml-render');
const parser = require('posthtml-parser');
const { ServerUtil } = require('./source/lib/index.cjs');

const layoutsDir = `${__dirname}/source/layouts`;
const isDev = process.env.NODE_ENV === 'development';

module.exports = () => ({
	plugins: [
		(() => async (tree) => {
			const page = tree.options.from.replace(/^.*pages(\\+|\/+)(.*)\.njk$/, '$2');
			let data = {
				errors: [],
				isDev,
				page
			};

			// Перечитываем код логики проекта при каждом изменении
			data = await ServerUtil.modifyData(`${layoutsDir}/main.js`, data);

			// Перечитываем код логики страницы при каждом изменении
			data = await ServerUtil.modifyData(`${layoutsDir}/pages/${page}.js`, data);

			return parser(ServerUtil.renderNjk(render(tree), data));
		})(),
		require('posthtml-w3c')(),
		require('htmlnano')({ collapseWhitespace: 'aggressive' })
	]
});
