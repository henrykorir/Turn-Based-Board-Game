const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('processHTML', () => {
	gulp.src('*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('processJS', () => {
	gulp.src('*.js')
		.pipe(jshint({
			esversion: 6
		}))
		.pipe(jshint.reporter('default'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('dest'));
});

gulp.task('babelPolyfill', () => {
	gulp.src('node_modules/babel-polyfill/browser.js')
		.pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});
