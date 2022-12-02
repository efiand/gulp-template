export { punctify } from '../../scripts/common/utils.js';

export const getImages = ({ additions = {}, file, useAdaptive = true } = {}) => {
	const [[, filename, ext]] = [...file.matchAll(/([^.]*)\.([^.]*)/g)];
	const isRaster = ext !== 'svg';

	const image = Object.assign(additions, {
		desktop: `images/${filename}.${ext}`
	});

	if (useAdaptive) {
		image.tablet = `images/${filename}-tablet.${ext}`;
		image.mobile = `images/${filename}-mobile.${ext}`;
	}

	if (isRaster) {
		image.desktop2x = `images/${filename}@2x.${ext}`;
		image.webpDesktop = `images/${filename}.webp`;
		image.webpDesktop2x = `images/${filename}@2x.webp`;

		if (useAdaptive) {
			image.tablet2x = `images/${filename}-tablet@2x.${ext}`;
			image.webpTablet = `images/${filename}-tablet.webp`;
			image.webpTablet2x = `images/${filename}-tablet@2x.webp`;
			image.mobile2x = `images/${filename}-mobile@2x.${ext}`;
			image.webpMobile = `images/${filename}-mobile.webp`;
			image.webpMobile2x = `images/${filename}-mobile@2x.webp`;
		}
	}

	return image;
};
