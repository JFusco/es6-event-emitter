'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {exec} from 'child_process';

const $ = gulpLoadPlugins({
	pattern: ['gulp-*', 'run-sequence', 'minimist'],
	scope: ['devDependencies']
});
const argv = $.minimist(process.argv.slice(2));

gulp.task('eslint', function(){
	console.log('\n| Running ESLint |');
	console.log('+----------------------------------------------------------+');

	return gulp.src(['./src/**/*.js', '!node_modules/**'])
			.pipe($.eslint('./.eslintrc'))
			.pipe($.filelog('eslint'))
			.pipe($.eslint.format())
			.pipe($.eslint.failAfterError());
});

gulp.task('watch', function() {
	gulp.watch(['./src/**/*.js' ], ['eslint']);
});

gulp.task('test', (cb) => {
	exec('npm test', (err, stdout) => {
		if(err) throw new $.util.PluginError('test', err);

		$.util.log('[test]', stdout.toString({
			colors: true
		}));

		cb();
	});
});

gulp.task('default', function(cb){
	$.runSequence('eslint', 'test', function(){
		$.util.log($.util.colors.green.bold('FINISHED BUILD'));

		if(argv.w){
			$.runSequence('watch');
		}

		cb();
	});
});