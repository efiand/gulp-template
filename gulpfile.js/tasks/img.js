const { src, dest } = require(`gulp`);
const { changed, if: gulpIf, imagemin, webp } = require(`gulp-load-plugins`)();
const { config } = require(`pineglade-config`);
const { Sources, Dests, isDev } = require(`../const`);
const QUALITY = 80;

const img = () => src(Sources.IMG)
	.pipe(changed(Dests.IMG))
	.pipe(gulpIf(!isDev, imagemin([
		imagemin.svgo(config.svgo),
		imagemin.optipng(),
		require(`imagemin-jpegoptim`)({
			max: QUALITY,
			progressive: true
		})
	])))
	.pipe(dest(Dests.IMG))
	.pipe(webp({ quality: QUALITY }))
	.pipe(dest(Dests.IMG));

module.exports = img;
