const svgoPrecision = {
	floatPrecision: 2
};

module.exports = {
	COPY_SOURCE: [
		`source/as-is/**/.*`,
		`source/as-is/**/*.*`
	],
	DIST: `public`,
	ESLINT_SOURCE: [
		`gulpfile.js/**/*.js`,
		`source/data/**/*.js`,
		`source/js/**/*.js`
	],
	SVGO_CONFIG: {
		plugins: [
			{ removeViewBox: false },
			{ removeTitle: true },
			{ cleanupNumericValues: svgoPrecision },
			{ convertPathData: svgoPrecision },
			{ transformsWithOnePath: svgoPrecision },
			{ convertTransform: svgoPrecision },
			{ cleanupListOfValues: svgoPrecision }
		]
	}
};
