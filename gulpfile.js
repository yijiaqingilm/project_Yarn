// Generated on 2016-08-15 using generator-angular 0.15.1
'use strict';

var gulp = require('gulp');
var path = require('path')
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var px2rem = require('gulp-px3rem');
var sass = require("gulp-sass");
var compass = require('gulp-compass');
var browserSync = require('browser-sync').create();
var proxyMiddleware = require('http-proxy-middleware');
var proxy = proxyMiddleware(['/user', '/passport'], {
	target: 'http://www.indmen.com',
	changeOrigin: true
});
px2rem({
	baseDpr: 2, // base device pixel ratio (default: 2)
	threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
	remVersion: true, // whether to generate rem version (default: true)
	remUnit: 75, // rem unit value (default: 75)
	remPrecision: 6 // rem precision (default: 6)
})

var yeoman = {
	app: require('./bower.json').appPath || 'app',
	dist: 'dist'
};

var paths = {
	scripts: [yeoman.app + '/scripts/**/*.js', yeoman.app + '/views/**/*.js'],
	styles: [yeoman.app + '/styles/**/*.css', yeoman.app + '/views/**/*.css'],
	sass: [yeoman.app + '/sass/**/*.scss'],
	sass_view: [yeoman.app + "/views/**/*.scss"],
	test: ['test/spec/**/*.js'],
	testRequire: [
		yeoman.app + '/bower_components/angular/angular.js',
		yeoman.app + '/bower_components/angular-mocks/angular-mocks.js',
		yeoman.app + '/bower_components/angular-resource/angular-resource.js',
		yeoman.app + '/bower_components/angular-cookies/angular-cookies.js',
		yeoman.app + '/bower_components/angular-sanitize/angular-sanitize.js',
		yeoman.app + '/bower_components/angular-route/angular-route.js',
		'test/mock/**/*.js',
		'test/spec/**/*.js'
	],
	karma: 'karma.conf.js',
	views: {
		main: yeoman.app + '/index.html',
		files: [yeoman.app + '/views/**/*.html']
	}
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
	.pipe($.jshint, '.jshintrc')
	.pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
	.pipe($.autoprefixer, 'last 1 version')
	.pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(styles());
});

gulp.task('lint:scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(lintScripts());
});

gulp.task('clean:tmp', function(cb) {
	rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function() {
	openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
	$.connect.server({
		/*yeoman.app*/
		root: ['/', '.tmp'],
		livereload: true,
		// Change this to '0.0.0.0' to access the server from outside.
		port: 9000
	});
});

gulp.task('start:server:test', function() {
	$.connect.server({
		root: ['test', yeoman.app, '.tmp'],
		livereload: true,
		port: 9001
	});
});

gulp.task('watch', function() {
	$.watch(paths.styles)
		.pipe($.plumber())
		.pipe(styles())
		.pipe($.connect.reload());

	$.watch(paths.views.files)
		.pipe($.plumber())
		.pipe($.connect.reload());

	$.watch(paths.scripts)
		.pipe($.plumber())
		.pipe(lintScripts())
		.pipe($.connect.reload());

	$.watch(paths.test)
		.pipe($.plumber())
		.pipe(lintScripts());

	gulp.watch('bower.json', ['bower']);
});

gulp.task('sass', function() {
	console.log(path);
	return gulp.src(paths.sass)
		.pipe(sass.sync().on('error', sass.logError))
		/*.pipe(compass({
			config_file: path.join(process.cwd(), 'config.rb'),
			project: path.join(process.cwd(), '/app'),
			css: yeoman.app+'/styles',
			sass: yeoman.app+'/sass'
		}))*/
		.pipe(px2rem())
		.pipe(gulp.dest(yeoman.app + '/styles'));
});
gulp.task('sass_view', function() {
	return gulp.src(paths.sass_view)
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(px2rem())
		.pipe(gulp.dest(yeoman.app + '/views'));
});

gulp.task('sass:watch', function() {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.sass_view, ['sass_view']);
});

gulp.task('serve', function(cb) {
	runSequence('clean:tmp', ['lint:scripts'], ['start:client'],
		'watch', cb);
});

gulp.task('serve:prod', function() {
	$.connect.server({
		root: [yeoman.dist],
		livereload: true,
		port: 9000
	});
});

gulp.task('test', ['start:server:test'], function() {
	var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
	return gulp.src(testToFiles)
		.pipe($.karma({
			configFile: paths.karma,
			action: 'watch'
		}));
});

// inject bower components
gulp.task('bower', function() {
	return gulp.src(paths.views.main)
		.pipe(wiredep({
			directory: yeoman.app + '/bower_components',
			ignorePath: '..'
		}))
		.pipe(gulp.dest(yeoman.app + '/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function(cb) {
	rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'styles'], function() {
	var jsFilter = $.filter('**/*.js');
	var cssFilter = $.filter('**/*.css');
	/*{
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'all' //保留所有注释
    })*/

	return gulp.src(paths.views.main)
		.pipe($.useref({
			searchPath: [yeoman.app, '.tmp']
		}))
		.pipe(jsFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
		/*.pipe(px2rem())*/
		.pipe($.minifyCss({
			cache: true
		}))
		.pipe(cssFilter.restore())
		/*.pipe($.rev())*/
		.pipe($.revReplace())
		.pipe(gulp.dest(yeoman.dist));
});
gulp.task('view_style', function() {
	var jsFilter = $.filter('**/*.js');
	var cssFilter = $.filter('**/*.css');
	/*{
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        preserveComments: 'all' //保留所有注释
    })*/
	var styleUrl = [yeoman.app + '/views/**/*.css', yeoman.app + '/views/**/*.js'];
	var destUrl = "dist/views";
	return gulp.src(styleUrl)
		.pipe(jsFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
		/*.pipe(px2rem())*/
		.pipe($.minifyCss({
			cache: true
		}))
		.pipe(cssFilter.restore())
		/*.pipe($.rev())*/
		.pipe($.revReplace())
		.pipe(gulp.dest(destUrl));
});

gulp.task('html', function() {
	var html = [yeoman.app + '/views/**/*.html'];
	return gulp.src(html)
		.pipe(gulp.dest(yeoman.dist + '/views'));

});

gulp.task('images', function() {
	return gulp.src(yeoman.app + '/images/**/*')
		.pipe($.imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function() {
	return gulp.src(yeoman.app + '/*/.*', {
			dot: true
		})
		.pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function() {
	return gulp.src(yeoman.app + '/fonts/**/*')
		.pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function() {
	runSequence(['images', 'copy:extras', 'copy:fonts', 'client:build', 'view_style']);
});

gulp.task('default', ['build']);

gulp.task('server-sync', function() {
	browserSync.init({
		server: {
			baseDir: './',
			middleware: [proxy]
		},
		files: [
			yeoman.app + '/**/*.css',
			yeoman.app + '/**/*.js',
			yeoman.app + '/**/*.html',
			yeoman.app + '/**/*/*.html'
		]

	});

	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.sass_view, ['sass_view']);
	//gulp.watch(paths + "/**/*/*.html").on('change', browserSync.reload);
});