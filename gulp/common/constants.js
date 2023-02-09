export const isDev = process.argv.includes('--dev');
export const isTest = process.argv.includes('--testing');

export const STATIC_FILES = ['css', 'ico', 'jpg', 'js', 'json', 'png', 'svg', 'webp', 'woff2'];

export const StatusCode = {
	ERROR: 500,
	NOT_FOUND: 404
};
