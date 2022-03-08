module.exports = {
	plugins: {
		stylelint: {},
		'postcss-bem-linter': {},
		'postcss-easy-import': {},
		'postcss-custom-media': {
			importFrom: 'source/styles/modules/mq.css'
		},
		'postcss-nested': {},
		'postcss-base64': {
			extensions: ['.png'],
			root: 'source/icons/'
		},
		'postcss-sort-media-queries': {},
		autoprefixer: {},
		cssnano: {
			preset: [
				'default',
				{
					cssDeclarationSorter: false
				}
			]
		},
		'postcss-reporter': {
			clearAllMessages: true,
			throwError: process.env.NODE_ENV !== 'development'
		}
	}
};
