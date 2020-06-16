import { STORAGE_FLAG } from '../const';

export default class TextField {
	constructor(input) {
		if (STORAGE_FLAG) {
			input.value = input.value || localStorage.getItem(input.name);

			input.addEventListener(`input`, () => {
				if (input.checkValidity()) {
					localStorage.setItem(input.name, input.value);
				}
			});
		}
	}
}
