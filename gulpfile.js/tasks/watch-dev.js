const { Paths, DEV_PORT, PROXY } = require(`../constants`);
const browserSync = require(`browser-sync`).create();
const { series, parallel, watch } = require(`gulp`);
const compileHtml = require(`./compile-html`);
const testHtml = require(`./test-html`);
const compileCss = require(`./compile-css`);
const testCss = require(`./test-css`);
const bundleJs = require(`./bundle-js`);
const testJs = require(`./test-js`);
const minifyImg = require(`./minify-img`);
const minifyIcons = require(`./minify-icons`);
const compileWebp = require(`./compile-webp`);
const compileSprite = require(`./compile-sprite`);
const copyAsIs = require(`./copy-as-is`);

const appMode = process.env.PROXY === `on`;
const htmlSeq = appMode ? [testHtml] : [testHtml, compileHtml];

const serverConfig = {
	cors: true,
	notify: false,
	port: DEV_PORT,
	ui: false
};
if (appMode) {
	serverConfig.proxy = PROXY;
} else {
	serverConfig.server = Paths.DEST;
}

const reloadServer = (done) => {
	browserSync.reload();
	done();
};

const createServer = () => {
	browserSync.init(serverConfig);

	watch(Paths.PAGES_FILES, series(...htmlSeq, reloadServer));
	watch(Paths.CSS_FILES, series(testCss, compileCss, reloadServer));
	watch(Paths.JS_FILES, series(testJs, bundleJs, reloadServer));
	watch(Paths.IMG_RAW_FILES, minifyImg);
	watch(Paths.AS_IS_FILES, series(copyAsIs, reloadServer));
	watch(Paths.IMG_FILES, series(compileWebp, reloadServer));
	watch(Paths.ICONS, series(minifyIcons, parallel(compileSprite, compileCss), reloadServer));
};

const watchDev = appMode ? createServer : series(compileHtml, createServer);
module.exports = watchDev;
