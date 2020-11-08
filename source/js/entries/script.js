import TextField from '../components/text-field';

window.textFields = [];
for (const field of document.querySelectorAll(`[type^="te"], [type="email"], [type="search"]`)) {
	window.textFields.push(new TextField(field));
}

// Узнаем ширину полосы прокрутки
const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
// Отмена кастомной стилизации скроллбара на мобильной платформе
if (!scrollWidth) {
	for (const el of document.querySelectorAll(`.custom-scrollbar`)) {
		el.classList.remove(`custom-scrollbar`);
	}
}
document.documentElement.style.setProperty(`--scrollbar-width`, `${scrollWidth}px`);

// Добавление класса доступности на корневой элемент
const setA11yHandler = (evt) => {
	if (evt.key === `Tab`) {
		document.documentElement.classList.add(`a11y`);
		document.removeEventListener(`keydown`, setA11yHandler);
	}
};
document.addEventListener(`keydown`, setA11yHandler);
