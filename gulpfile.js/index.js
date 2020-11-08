'use strict';

const { series, parallel } = require(`gulp`);
const compileHtml = require(`./tasks/compile-html`);
const testHtml = require(`./tasks/test-html`);
const compileCss = require(`./tasks/compile-css`);
const testCss = require(`./tasks/test-css`);
const bundleJs = require(`./tasks/bundle-js`);
const testJs = require(`./tasks/test-js`);
const minifyImg = require(`./tasks/minify-img`);
const minifyIcons = require(`./tasks/minify-icons`);
const compileWebp = require(`./tasks/compile-webp`);
const compileSprite = require(`./tasks/compile-sprite`);
const copyAsIs = require(`./tasks/copy-as-is`);
const cleanDist = require(`./tasks/clean-dist`);
const watchDev = require(`./tasks/watch-dev`);
const watchTest = require(`./tasks/watch-test`);

const test = parallel(testHtml, testCss, testJs);
const prepare = parallel(test, cleanDist);
const minifyGraphics = parallel(minifyImg, minifyIcons);
const compileGraphics = parallel(copyAsIs, compileSprite, compileWebp);
const compileAssets = parallel(compileCss, bundleJs);
const buildDist = series(prepare, minifyGraphics, compileGraphics, compileAssets);

exports.test = series(test, watchTest);
exports.build = series(buildDist, compileHtml);
exports.default = series(buildDist, watchDev);
