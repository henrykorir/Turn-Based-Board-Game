// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', () => {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint({
		  esversion: 6
		}))
		.pipe(jshint.reporter('default'))
});

gulp.task('vendor', () => {
  return gulp.src('vendor/*.js')
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('scripts', function() {
    return browserify({
				entries: './index.js',
				debug: true
			})
			.transform(babelify)
			.on('error',gutil.log)
			.bundle()
			.on('error',gutil.log)
			.pipe(source('index.js'))
			.pipe(gulp.dest('dist/js'))
});
gulp.task('img', function() {
    return gulp.src('src/assets/*')
        .pipe(gulp.dest('dist/assets'));
});
gulp.task('browserSync', () => {
	browserSync.init({
		server: './dist',
		port: 8080,
		ui: {
			port: 8081
		}
	});
});
//deploy
gulp.task('deploy', gulp.series(['css', 'html', 'vendor', 'scripts', 'img']));
// Watch Files For Changes
gulp.task('watch',gulp.series(['browserSync']), function() {
    gulp.watch('src/js/**/*.js', gulp.series(['lint', 'scripts']));
    gulp.watch('src/css/*.css', gulp.series(['html']));
    gulp.watch('*.html', gulp.series(['html']));
    gulp.watch('dist/js/*.js', gulp.series(browserSync.reload));
    gulp.watch('dist/css/*.css', gulp.series(browserSync.reload));
    gulp.watch('dis/*.html', gulp.series(browserSync.reload));
});

//Default Task
gulp.task('default', gulp.series(['css', 'html', 'vendor', 'scripts', 'img', 'watch']));