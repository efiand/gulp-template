const { Paths } = require(`../constants`);
const { watch } = require(`gulp`);
const testHtml = require(`./test-html`);
const testCss = require(`./test-css`);
const testJs = require(`./test-js`);

const WELCOME_TEXT = `The test will restart when saving any of the test files\nPress ctrl + c to exit`;

const watchTest = () => {
	watch(Paths.TEMPLATES_FILES, testHtml);
	watch(Paths.CSS_FILES, testCss);
	watch(Paths.JS_FILES, testJs);
	console.warn(WELCOME_TEXT);
};

module.exports = watchTest;
