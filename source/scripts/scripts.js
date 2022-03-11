import Form from '../components/form/form.js';
import { initModals } from 'pineglade-modal';

export * from './modules/breakpoints.js';

initModals();

// Открываем все контролы, бессмысленные без наличия JS
for (const noJsHiddenEl of document.querySelectorAll('.no-js-hidden')) {
	noJsHiddenEl.classList.remove('no-js-hidden');
}

for (const formEl of document.querySelectorAll('.form')) {
	new Form(formEl);
}
