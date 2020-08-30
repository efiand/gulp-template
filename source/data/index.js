const pages = [
	{
		page: `index`,
		title: `Главная`
	},
	{
		hideInMenu: true,
		page: `404`,
		title: `Страница не найдена`
	}
];

module.exports = {
	get({ page }) {
		return {
			title: pages.find((item) => item.page === page).title,
			url: `/${page}.html`
		};
	}
};
