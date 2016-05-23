var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var bourbon = require('bourbon').includePaths;	
var browserSync = require('browser-sync');

// PATH CONFIG
var paths = {

	// BOOTSTRAP CSS
	bootstrapCss: './node_modules/bootstrap/dist/css/bootstrap.css',

	// SOURCE
	cssSource: './src/css/',
	imgSource: './src/img/',
	jsSource: './src/js/',
	htmlSource: './src/',
	
	// DESTINATION
	cssDestination: './dist/css/',
	imgDestination: './dist/img/',
	jsDestination: './dist/js/',
	htmlDestination: './dist/'

};

gulp.task('compile-css', function() {
	// SASS
	var sassStream = gulp.src(paths.cssSource + '**/*.scss')
		.pipe(plumber())
		.pipe(sass({
        	includePaths: bourbon,
        	outputStyle: 'compressed'
        }))
		//.pipe(gulp.dest(paths.cssDestination))
		//.pipe(browserSync.stream());


	var bootstrapStream = gulp.src(paths.bootstrapCss)
		//.pipe(gulp.dest(paths.cssDestination))
		//.pipe(browserSync.stream());

	return merge(bootstrapStream, sassStream)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(paths.cssDestination))
		.pipe(browserSync.stream());
});

gulp.task('compile-html', function() {
	gulp.src(paths.htmlSource + '**/*.jade')
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest(paths.htmlDestination))
		.pipe(browserSync.stream());
});

gulp.task('copy-image', function() {
	gulp.src(paths.imgSource + '**/*')
		.pipe(gulp.dest(paths.imgDestination))
		.pipe(browserSync.stream());
});

gulp.task('copy-js', function() {
	gulp.src(paths.jsSource + '**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest(paths.jsDestination))
		.pipe(browserSync.stream());
});

gulp.task('watch', function() {

	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});

	gulp.watch(paths.cssSource + '**/*', ['compile-css']);
	gulp.watch(paths.imgSource + '**/*', ['copy-image']);
	gulp.watch(paths.jsSource + '**/*', ['copy-js']);
	gulp.watch(paths.htmlSource + '**/*.jade', ['compile-html']);

})
gulp.task('build', ['compile-css', 'compile-html', 'copy-image', 'copy-js'])
gulp.task('default', ['compile-css', 'compile-html', 'copy-image', 'copy-js', 'watch'])