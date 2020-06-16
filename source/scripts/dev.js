import { Breakpoint } from './modules/breakpoints.js';
import loadPP from 'pineglade-pp';

window.pinegladePP = {
	breakpoints: [Breakpoint.DESKTOP],
	folder: 'pixelperfect'
};

loadPP();
