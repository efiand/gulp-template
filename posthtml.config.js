module.exports = () => {
	const plugins = [
		require('pineglade-w3c').getPosthtmlW3c({
			exit: process.env.NODE_ENV !== 'development',
			forceOffline: true,
			getSourceName: (filename) => filename
				.replace(/^.*pages(\\+|\/+)(.*)$/, '$2')
				.replace(/\\/g, '/')
		})
	];

	if (process.env.NODE_ENV === 'production') {
		plugins.push(require('htmlnano')({
			collapseWhitespace: 'aggressive',
			minifySvg: false
		}));
	}

	return { plugins };
};
