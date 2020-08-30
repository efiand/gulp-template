const { src, dest } = require(`gulp`);
const { changed, plumber, if: gulpIf, imagemin, webp } = require(`gulp-load-plugins`)();
const { SVGO_CONFIG } = require(`../const`);

const img = () => src(`source/img/**/*.{svg,png,jpg}`)
	.pipe(changed(`build/img`))
	.pipe(plumber())
	.pipe(gulpIf(Boolean(process.env.NODE_ENV), imagemin([
		imagemin.svgo(SVGO_CONFIG),
		imagemin.optipng(),
		require(`imagemin-jpegoptim`)({
			max: 80,
			progressive: true
		})
	])))
	.pipe(dest(`build/img`))
	.pipe(webp({
		quality: 90
	}))
	.pipe(dest(`build/img`));

module.exports = img;
