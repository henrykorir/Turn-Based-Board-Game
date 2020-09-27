// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
const babel = require('gulp-babel');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint({
		  esversion: 6
		}))
		.pipe(jshint.reporter('default'))
});

// Compile Our Sass
/*
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
*/
// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
		.pipe(gulp.src('vendor/*.js'))
        .pipe(gulp.dest('dist/js'));
});


gulp.task('babelPolyfill', () => {
  return gulp.src('node_modules/babel-polyfill/browser.js')
    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', gulp.series(['lint', 'scripts']));
});

//Default Task
gulp.task('default', gulp.series(['lint', 'scripts', 'babelPolyfill', 'watch']));