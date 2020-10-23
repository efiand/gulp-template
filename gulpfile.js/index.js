'use strict';

const { src, series, parallel } = require(`gulp`);
const { print } = require(`gulp-load-plugins`)();
const tasks = require(`require-dir`)(`tasks`);
const { testtwig, testless, testjs, clean, copy, html, css, js, img, iconsmin, sprite, server } = tasks;

const done = () => src(`.`).pipe(print.default(() => `Done`));

const test = parallel(testtwig, testless, testjs);
const build = series(parallel(test, clean), iconsmin, parallel(copy, css, js, img, sprite));

exports.test = series(test, done);
exports.build = series(build, html);
exports.default = series(build, server);
