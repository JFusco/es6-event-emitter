var webpack = require('karma-webpack');

module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
		files: ['spec/*-spec.js'],
		plugins: [webpack, 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter'],
		browsers: ['PhantomJS'],
		preprocessors: {
			'spec/*-spec.js': ['webpack'],
			'src/js/*.js': ['webpack']
		},
		reporters: ['spec'],
		webpack: {
			module: {
				loaders: [{
					test: /\.js?$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader'
				}]
			}
		},
		webpackMiddleware: { noInfo: true }
	});
};
