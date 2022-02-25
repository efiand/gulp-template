(_data, Util) => {
	Util.addBlankLink = (item) => ({
		...item,
		href: !item.href && item.href !== null ? 'blank.html' : item.href
	});

	return {
		heading: 'Страница в разработке!',
		lang: 'ru',
		projectName: 'My project',
		title: 'Страница в разработке'
	};
};
