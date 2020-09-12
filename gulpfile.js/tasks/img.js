const { src, dest } = require(`gulp`);
const { changed, plumber, if: gulpIf, imagemin, webp } = require(`gulp-load-plugins`)();
const { DIST, SVGO_CONFIG } = require(`../const`);

const img = () => src(`source/img/**/*.{svg,png,jpg}`)
	.pipe(changed(`${DIST}/img`))
	.pipe(plumber())
	.pipe(gulpIf(Boolean(process.env.NODE_ENV), imagemin([
		imagemin.svgo(SVGO_CONFIG),
		imagemin.optipng(),
		require(`imagemin-jpegoptim`)({
			max: 80,
			progressive: true
		})
	])))
	.pipe(dest(`${DIST}/img`))
	.pipe(webp({
		quality: 90
	}))
	.pipe(dest(`${DIST}/img`));

module.exports = img;
