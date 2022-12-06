export { punctify } from '../../scripts/common/utils.js';

export const getImages = (file, { adaptive = false, alt = null, height = null, width = null } = {}) => {
	const [[, filename, ext]] = [...file.matchAll(/([^.]*)\.([^.]*)/g)];
	const isRaster = ext !== 'svg';

	const image = {
		mobile: `images/${filename}.${ext}`
	};

	if (isRaster) {
		image.mobile2x = `images/${filename}@2x.${ext}`;
		image.webpMobile = `images/${filename}.webp`;
		image.webpMobile2x = `images/${filename}@2x.webp`;
	}

	if (alt) {
		image.alt = alt;

		if (width && height) {
			image.width = width;
			image.height = height;
		}
	}

	if (!image.width && adaptive) {
		image.tablet = `images/${filename}-tablet.${ext}`;
		image.desktop = `images/${filename}-desktop.${ext}`;

		if (isRaster) {
			image.tablet2x = `images/${filename}-tablet@2x.${ext}`;
			image.webpTablet = `images/${filename}-tablet.webp`;
			image.webpTablet2x = `images/${filename}-tablet@2x.webp`;
			image.desktop2x = `images/${filename}-desktop@2x.${ext}`;
			image.webpDesktop = `images/${filename}-desktop.webp`;
			image.webpDesktop2x = `images/${filename}-desktop@2x.webp`;
		}
	}

	return image;
};
