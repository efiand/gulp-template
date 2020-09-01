'use strict';

const { series, parallel } = require(`gulp`);
const tasks = require(`require-dir`)(`tasks`);

const { twighint, stylelint, eslint, clean, copy, html, css, js, img, sprite, server } = tasks;

const test = parallel(twighint, stylelint, eslint);
const build = series(parallel(test, clean), parallel(copy, css, js, img, sprite));

exports.test = test;
exports.build = series(build, html);
exports.server = series(build, server);
exports.default = series(build, html, server);
