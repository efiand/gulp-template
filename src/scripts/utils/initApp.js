// Универсальный метод инициализации нативных и svelte-компонентов
export default (App, target = null, props = {}) => {
	if (!App || !target) {
		return null;
	}

	return new App({
		hydrate: true,
		props,
		target
	});
};
