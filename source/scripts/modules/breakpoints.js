import { getScrollbarWidth } from 'pineglade-modal';

export const Breakpoint = {
	DESKTOP: 1280,
	TABLET: 768
};

const screenChangeEvent = new CustomEvent('screenchange');
const setBreakpoint = () => {
	let breakpoint = 'mobile';
	if (window.innerWidth >= Breakpoint.DESKTOP) {
		breakpoint = 'desktop';
	} else if (window.innerWidth >= Breakpoint.TABLET) {
		breakpoint = 'tablet';
	}
	if (window.breakpoint !== breakpoint) {
		document.documentElement.style.setProperty('--scrollbar-width', getScrollbarWidth());

		window.breakpoint = breakpoint;
		window.dispatchEvent(screenChangeEvent);
	}
};

setBreakpoint();
window.addEventListener('resize', setBreakpoint);
