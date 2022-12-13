export default class PageHeader {
	constructor({ target }) {
		this._headerElement = target;

		this._headerElement.classList.remove('PageHeader_noJs');
	}
}
