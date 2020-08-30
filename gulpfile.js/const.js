const svgoPrecision = {
	floatPrecision: 2
};

module.exports = {
	COPY_SOURCE: [
		`source/as-is/**/.*`,
		`source/as-is/**/*.*`
	],
	DIST: `build`,
	ESLINT_SOURCE: [
		`gulpfile.js/**/*.js`,
		`source/data/**/*.js`,
		`source/js/**/*.js`
	],
	HttpCode: {
		FORBIDDEN: 403,
		INTERNAL_SERVER_ERROR: 500,
		NOT_FOUND: 404,
		OK: 200,
		UNAUTHORIZED: 401
	},
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
