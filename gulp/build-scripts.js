import { isDev, isTest } from './common/constants.js';
import TerserPlugin from 'terser-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import gulp from 'gulp';
import path from 'node:path';
import server from 'browser-sync';
import useCondition from 'gulp-if';
import webpack from 'webpack-stream';

const webpackConfig = {
	mode: isDev ? 'development' : 'production',
	module: {
		rules: [
			{
				loader: 'vue-loader',
				test: /\.vue$/
			},
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							css: false,
							dev: isDev,
							hydratable: true
						}
					}
				}
			},
			{
				resolve: {
					fullySpecified: false
				},
				test: /node_modules\/svelte\/.*\.mjs$/
			}
		]
	},
	optimization: {
		minimize: !isDev,
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
	performance: {
		hints: false
	},
	plugins: [new VueLoaderPlugin()],
	resolve: {
		alias: {
			svelte: path.resolve(process.cwd(), 'node_modules/svelte')
		}
	}
};

const buildScripts = () =>
	gulp
		.src('source/scripts/main.js')
		.pipe(webpack(webpackConfig))
		.pipe(useCondition(!isTest, gulp.dest('build/scripts')))
		.pipe(useCondition(isDev, server.stream()));

export default buildScripts;
