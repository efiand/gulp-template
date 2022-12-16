import { FocusLock } from '../../scripts/modules/focus-lock.js';

const focusLock = new FocusLock();

const closeModal = () => {
	window.location.hash = '#page';
	focusLock.unlock();
};

document.addEventListener('keydown', (event) => {
	if (!event.key.startsWith('Esc')) {
		return;
	}

	if (document.querySelector(`.Modal[id="${window.location.hash.slice(1)}"]`)) {
		closeModal();
	}
});

export default class Modal {
	constructor({ target }) {
		this._selector = `#${target.id}`;

		if (window.location.hash === this._selector) {
			focusLock.lock(this._selector);
		}

		document.querySelectorAll(`[href="${this._selector}"]`).forEach((openerElement) => {
			openerElement.addEventListener('click', () => {
				focusLock.lock(this._selector);
			});
		});
		target.querySelectorAll('[href="#page"]').forEach((closerElement) => {
			closerElement.addEventListener('click', (event) => {
				event.preventDefault();
				closeModal();
			});
		});
	}
}
