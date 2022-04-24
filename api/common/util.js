import { StatusCodes } from 'http-status-codes';

export const getPathToRoot = (page) => Array((page.match(/\//g) || []).length)
	.fill('../')
	.join('');

export const getPageData = async (page) => {
	let data = {
		page,
		root: getPathToRoot(page)
	};

	const getCommonData = await import('../data/common.js');
	data = {
		...data,
		...getCommonData.default(data)
	};

	let getData = () => ({});
	let statusCode = StatusCodes.OK;
	try {
		getData = await import(`../data/pages/${page}.js`);
	} catch (err) {
		statusCode = StatusCodes.NOT_FOUND;
		getData = await import('../data/pages/404.js');
	}

	return {
		...data,
		...getData.default(data),
		statusCode
	};
};
