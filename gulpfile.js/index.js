'use strict';

const { series, parallel } = require(`gulp`);
const tasks = require(`require-dir`)(`tasks`);

const { twighint, stylelint, eslint, clean, copy, html, css, js, img, sprite, server } = tasks;

const test = parallel(twighint, stylelint, eslint);
const build = series(parallel(test, clean), parallel(copy, html, css, js, img, sprite));

exports.test = test;
exports.build = build;
exports.default = series(build, server);
