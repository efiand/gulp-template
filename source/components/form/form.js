export default class Form {
	constructor(form) {
		this._form = form;
		this._submitters = this._form.querySelectorAll('[type="submit"]');
		this._validableClass = this._form.dataset.validableClass || null;

		this._setListeners();
	}

	_setListeners() {
		this._handleSubmit = this._handleSubmit.bind(this);
		for (const submitter of this._submitters) {
			submitter.addEventListener('click', this._handleSubmit);
		}
	}

	_handleSubmit(evt) {
		evt.preventDefault();

		if (this._validableClass) {
			this._form.classList.add(this._validableClass);
		}
	}
}
