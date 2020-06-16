import TerserPlugin from 'terser-webpack-plugin';

export default {
	mode: process.env.NODE_ENV,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				parallel: true,
				terserOptions: {
					format: {
						comments: false
					}
				}
			})
		]
	},
	output: {
		filename: '[name].min.js'
	}
};
