'use strict';

var gulp = require('gulp');
var gutil = require( 'gulp-util' );
var del = require('del');
var path = require('path');
var mochaSelenium = require('gulp-mocha');

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var server = require('gulp-develop-server');

// Styles
gulp.task('styles', function () {
    return gulp.src('src/index.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['./bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
    return browserify({
		entries: ['./src/index.js'],
		debug: true
	})
		.bundle()
		.pipe(source('index.js'))
		.pipe(gulp.dest('dist'));
});

// HTML
gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('./src/**/images/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
		.pipe($.rename({
			dirname: 'images'
		}))
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Unit test React stores and components
gulp.task('jest', function () {
    var nodeModules = path.resolve('./node_modules');
    return gulp.src('./src/**/test')
        .pipe($.jest({
            scriptPreprocessor: nodeModules + '/gulp-jest/preprocessor.js',
			testPathIgnorePatterns: [
				'node_modules',
				'bower_components'
			],
            unmockedModulePathPatterns: [nodeModules + 'react']
        }));
});

// Test HTTP API and unit test non-react code
gulp.task('mocha-test', function() {
	return gulp.src('./src/**/mocha-tests/*-test.js', {read: false})
		.pipe($.mocha());
});

// Unit test non React components
gulp.task('unit-test', function() {
	return gulp.src('./src/**/tests/unit/*-test.js', {read: false})
		.pipe($.mocha());
});

// Selenium test components
gulp.task('selenium-test', function() {
    return gulp.src('./src/**/tests/selenium/tests.js', {read: false})
        .pipe(mochaSelenium({
            timeout: 8000
    }));
});

// Run functional tests on HTTP endpoints
gulp.task('functional-test', function() {
	return gulp.src('./src/**/tests/functional/*-test.js', {read: false})
		.pipe($.mocha());
});

// Clean
gulp.task('clean', function (cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});


// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
	function onError( error ) {
		$.notify('Build failed: <%= error.message %>');
		console.error( error );
		gutil.beep();
	}

    return gulp.src('./src/index.html')
		.pipe($.plumber({ errorHandler: onError }))
		.pipe($.useref.assets())
		.pipe($.useref.restore())
		.pipe($.useref())
		.pipe($.plumber.stop())
		.pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean', 'build', 'jest', 'mocha-test' ]);

// Webserver
gulp.task('server:start', function() {
	server.listen({
		path: 'src/server.js'
	});
});


gulp.task('server:livereload', function() {
	gulp.watch(['src/**/*.js'], server.restart );
});

// Bower helper
gulp.task('bower', function() {
    gulp.src('./bower_components/**/*.js', {base: './bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task( 'test', [ 'jest', 'mocha-test', 'unit-test', 'functional-test' ]);

// Watch
gulp.task('watch', ['html', 'bundle', 'images', 'test', 'server:start'], function () {

    // Watch .html files
    gulp.watch('src/*.html', ['html']);

    // Watch .scss files
    gulp.watch('src/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/**/*.js', ['scripts', 'test', 'server:livereload']);

    // Watch image files
    gulp.watch('src/**/images/**/*', ['images']);
});
