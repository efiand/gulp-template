export const STORAGE_FLAG = (() => {
	try {
		localStorage.getItem(`test`);
	} catch (error) {
		return false;
	}
	return true;
})();
