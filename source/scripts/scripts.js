import Form from '../components/form/form.js';
import Modal from '../components/modal/modal.js';

export * from './modules/breakpoints.js';

// Открываем все контролы, бессмысленные без наличия JS
for (const noJsHiddenEl of document.querySelectorAll('.no-js-hidden')) {
	noJsHiddenEl.classList.remove('no-js-hidden');
}

for (const formEl of document.querySelectorAll('.form')) {
	new Form(formEl);
}

for (const modalEl of document.querySelectorAll('.modal')) {
	new Modal(modalEl);
}
