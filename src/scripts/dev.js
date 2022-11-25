import { Breakpoint } from './common/constants.js';
import { checkModPressed } from './common/utils.js';
import loadPixelperfect from '@efiand/pixelperfect';

window.pixelperfect = {
	breakpoints: [Breakpoint.MOBILE, Breakpoint.DESKTOP],
	ext: 'webp',
	folder: 'images'
};

loadPixelperfect();

// Делаем редактируемым контент по нажатию E
document.addEventListener('keydown', (evt) => {
	if (evt.key.toLowerCase() === 'e' && !checkModPressed(evt)) {
		document.body.contentEditable = document.body.contentEditable !== 'true';
	}
});
