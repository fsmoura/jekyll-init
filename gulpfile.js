var gulp      = require('gulp'),
	clean 			= require('gulp-clean'),
	browserSync = require('browser-sync'),
	sass        = require('gulp-sass'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	plumber     = require('gulp-plumber'),
	runSequence = require('run-sequence'),
	cp          = require('child_process');

var messages = {
	jekyllBuild: 'Running: jekyll-build'
};

gulp.task('jekyll-build', function(cb) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll build'], {stdio: 'inherit'}).on('close', cb);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
	browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		port: 4000,
		server: {
			baseDir: '_site'
		}
	});
});

gulp.task('clean', function() {
	return gulp.src(['assets/css/', 'assets/js/'])
		.pipe(clean());
});

gulp.task('sass', function() {
	return gulp.src('src/sass/main.sass')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('assets/css/'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(plumber())
		//.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'));
});

gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.sass', ['sass', 'jekyll-rebuild']);
	gulp.watch('src/js/*.js', ['js', 'jekyll-rebuild']);
	gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*', '_config.yml'], ['jekyll-rebuild']);
});

gulp.task('default', function(cb) {
	runSequence(['clean'], ['sass', 'js'], ['browser-sync', 'watch'], cb);
});

gulp.task('build', function(cb) {
	runSequence(['clean'], ['sass', 'js'], ['jekyll-build'], cb);
});
