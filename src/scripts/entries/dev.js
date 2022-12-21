import { Breakpoint } from '../constants.js';
import checkModPressed from '../utils/checkModPressed.js';
import loadPixelperfect from 'pixelperfect-tool';

window.pixelperfect = {
	breakpoints: [Breakpoint.MOBILE, Breakpoint.TABLET, Breakpoint.DESKTOP],
	ext: 'jpg',
	selector: '.Page'
};

loadPixelperfect();

// Делаем редактируемым контент по нажатию E
document.addEventListener('keydown', (evt) => {
	if (evt.key.toLowerCase() === 'e' && !checkModPressed(evt)) {
		document.body.contentEditable = document.body.contentEditable !== 'true';
	}
});
