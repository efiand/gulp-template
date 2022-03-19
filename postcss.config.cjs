const isDev = process.env.NODE_ENV === 'development';
const cssnano = isDev ? {} : {
	cssnano: {
		preset: [
			'default',
			{
				cssDeclarationSorter: false
			}
		]
	}
};

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
			extensions: ['.svg', '.png'],
			root: 'source/icons/'
		},
		'postcss-sort-media-queries': {},
		autoprefixer: {},
		...cssnano,
		'postcss-reporter': {
			clearAllMessages: true,
			throwError: !isDev
		}
	}
};
