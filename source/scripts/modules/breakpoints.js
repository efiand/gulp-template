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
		const scrollbarWidth = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
		document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

		window.breakpoint = breakpoint;
		window.dispatchEvent(screenChangeEvent);
	}
};

setBreakpoint();
window.addEventListener('resize', setBreakpoint);
