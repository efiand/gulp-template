export default async (fileName, data = {}) => {
	if (typeof data.version === 'undefined') {
		data.version = data.isDev ? `?${new Date().getTime()}` : '';
	}

	try {
		return await (await import(`../../source/${fileName}.js${data.version}`)).default(data);
	} catch (error) {
		if (!error.message.replace(/\\/g, '/').includes(fileName)) {
			console.error(error.message);
			process.exitCode = 1;
		}

		return data;
	}
};
