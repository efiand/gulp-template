const svgoPrecision = {
	floatPrecision: 2
};

module.exports = {
	copySource: [
		`source/as-is/**/.*`,
		`source/as-is/**/*.*`
	],
	eslintSource: [
		`gulpfile.js/**/*.js`,
		`source/data/**/*.js`,
		`source/js/**/*.js`
	],
	svgoConfig: {
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
