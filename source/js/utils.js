// Применение функции ко всем элементам DOM-коллекции
export const applyAll = (payload, cb) => {
	// Можно передать или готовую DOM-коллекцию, или селектор
	const nodeList = typeof payload === `string` ? document.querySelectorAll(payload) : payload;

	for (let i = 0; i < nodeList.length; i++) {
		cb(nodeList[i], i, nodeList);
	}
};

// Создание экземпляров класса на основе DOM-коллекции
export const applyClass = (Class, payload, addition = null) => {
	applyAll(payload, (item) => new Class(item, addition));
};

export const getScrollBarWidth = () => {
	// Создание временного элемента с прокруткой
	const scrollableTempBlock = document.createElement(`div`);
	scrollableTempBlock.style.overflowY = `scroll`;
	scrollableTempBlock.style.width = `50px`;
	scrollableTempBlock.style.height = `50px`;
	scrollableTempBlock.style.visibility = `hidden`;
	document.body.appendChild(scrollableTempBlock);

	const scrollbarWidth = scrollableTempBlock.offsetWidth - scrollableTempBlock.clientWidth;
	document.body.removeChild(scrollableTempBlock);
	return scrollbarWidth;
};

export const getTargetPath = (target) => {
	const path = [];

	while (target) {
		path.push(target);
		target = target.parentElement;
	}
	return path;
};

export const getTemplate = (payload) => {
	const node = typeof payload === `string` ? document.querySelector(payload) : payload;
	return node.innerHTML;
};

// Форматирует с сохранением только цифр
export const numberize = (str) => str.replace(/[^0-9]/g, ``);

// Форматирует как телефон для ссылки (с сохранением только цифр и плюсика)
export const formatTel = (str) => str.replace(/[^0-9+]/g, ``);

// Заменяет в строке вхождение вида {{something}} на элемент массива data
// для полного преобразования число элементов должно быть равно числу вхождений
export const renderTemplate = (str, data) => {
	let i = -1;
	return str.replace(/{{.*?}}/g, (match) => {
		i++;
		return data[i] || match;
	});
};

// Возвращает строковое представление числа с отделением тысячных разрядов пробелом
export const splitNumByGroups = (num) => num.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1,`);

// Выводит число с ведущим нулём
export const formatWithLead0 = (num) => `${num < 10 ? 0 : ``}${num}`;
