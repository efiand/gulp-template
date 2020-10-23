'use strict';

const { series, parallel } = require(`gulp`);
const tasks = require(`require-dir`)(`tasks`);
const { testtwig, testless, testjs, clean, copy, html, css, js, img, iconsmin, sprite, server } = tasks;

const test = parallel(testtwig, testless, testjs);
const build = series(parallel(test, clean), iconsmin, parallel(copy, css, js, img, sprite));

exports.test = test;
exports.build = series(build, html);
exports.default = series(build, server);
