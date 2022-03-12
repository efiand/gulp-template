const render = require('posthtml-render');
const parser = require('posthtml-parser');
const { getPosthtmlW3c } = require('pineglade-w3c');
const ServerUtil = require('./source/lib/server-util.cjs');

const layoutsDir = `${__dirname}/source/layouts`;
const isDev = process.env.NODE_ENV === 'development';

const getPageName = (tree) => tree.options.from.replace(/^.*pages(\\+|\/+)(.*)\.njk$/, '$2');

module.exports = () => ({
	plugins: [
		(() => async (tree) => {
			// Сборка шаблонизатором Nunjucks

			const page = getPageName(tree);
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
		require('htmlnano')({ collapseWhitespace: 'aggressive' }),
		(() => async (tree) => {
			// Доводка после всех плагинов
			const html = render(tree)
				.replace(/\/dt><dd/g, '/dt> <dd'); // Инлайновые <dt> и <dd>, важен пробел между ними

			return parser(html);
		})(),
		getPosthtmlW3c({
			getSourceName: (tree) => `${getPageName(tree)}.html`
		})
	]
});
