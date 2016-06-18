'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {exec} from 'child_process';

const $ = gulpLoadPlugins({
	pattern: ['gulp-*', 'run-sequence', 'minimist'],
	scope: ['devDependencies']
});
const argv = $.minimist(process.argv.slice(2));

gulp.task('eslint', () => {
	console.log('\n| Running ESLint |');
	console.log('+----------------------------------------------------------+');

	return gulp.src(['./src/**/*.js', './spec/**/*.js', '!node_modules/**'])
			.pipe($.eslint('./.eslintrc'))
			.pipe($.filelog('eslint'))
			.pipe($.eslint.format())
			.pipe($.eslint.failAfterError());
});

gulp.task('watch', () => {
	gulp.watch(['./src/**/*.js', './spec/**/*.js'], ['eslint']);
});

gulp.task('test', cb => {
	exec('npm test', (err, stdout) => {
		if(err) throw new $.util.PluginError('test', err);

		$.util.log('[test]', stdout.toString({
			colors: true
		}));

		cb();
	});
});

gulp.task('default', cb => {
	$.runSequence('eslint', 'test', () => {
		$.util.log($.util.colors.green.bold('FINISHED BUILD'));

		if(argv.w){
			$.runSequence('watch');
		}

		cb();
	});
});
