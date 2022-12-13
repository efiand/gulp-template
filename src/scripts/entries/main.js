import Form from '../../components/Form/Form.svelte';
import PageHeader from '../../components/PageHeader/PageHeader.js';
import { initApp } from '../utils.js';

const apps = {
	Form
};

const { widgets = [] } = window.pageData;

widgets.forEach(([widget, data = {}]) => {
	if (!apps[widget]) {
		return;
	}

	initApp(apps[widget], document.querySelector(`[data-widget="${widget}"]`), data);
});

initApp(PageHeader, document.querySelector('.PageHeader'));
