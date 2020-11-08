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
export const splitNumByGroups = (num) => num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1 `);

// Выводит число с ведущим нулём
const TWO_DIGIT = 10;
export const formatWithLead0 = (num) => `${num < TWO_DIGIT ? 0 : ``}${num}`;
