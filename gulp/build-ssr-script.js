import { VueLoaderPlugin } from 'vue-loader';
import gulp from 'gulp';
import { isDev } from './common/constants.js';
import path from 'node:path';
import rename from 'gulp-rename';
import through2 from 'gulp-through2';
import webpack from 'webpack-stream';

const webpackConfig = {
	experiments: {
		outputModule: true
	},
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
							generate: 'ssr'
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
		minimize: false
	},
	output: {
		library: {
			type: 'module'
		}
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

let appName = '';
global.appsConfig = [];

const buildSsrScript = () =>
	gulp
		.src('source/scripts/apps/*.js', { allowEmpty: true })
		.pipe(
			through2((content, { basename }) => {
				appName = basename.replace('.js', '');
			})
		)
		.pipe(webpack(webpackConfig))
		.pipe(
			rename((scriptPath) => {
				scriptPath.basename = appName;
				scriptPath.extname = '.js';
			})
		)
		.pipe(gulp.dest('build/scripts/apps'))
		.pipe(
			through2(async () => {
				global.appsConfig[appName] = (
					await import(`../build/scripts/apps/${appName}.js?${new Date().getTime()}`)
				).default;
			})
		);

export default buildSsrScript;
