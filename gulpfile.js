const gulp = require('gulp');
const sass = require('gulp-sass');
const browser_sync = require('browser-sync');

const startBrowserSync = function () {
    browser_sync.init({
        server: {
            baseDir: './build/',
        },
    });
};

const reloadBrowser = function (done) {
    browser_sync.reload();
    done();
};

const watchFiles = function () {
    gulp.watch('./dev/js/*.js', gulp.series(buildJs, reloadBrowser));
    gulp.watch('./dev/scss/*.scss', gulp.series(buildScss, reloadBrowser));
    gulp.watch('./build/*.html', reloadBrowser);
};

const buildJs = function () {
    return gulp.src('./dev/js/*.js').pipe(gulp.dest('./build/js/'));
};

const buildScss = function () {
    return gulp
        .src('./dev/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css/'));
};

const runDefaultCommand = function () {
    watchFiles();
    startBrowserSync();
};

exports.default = gulp.series(buildScss, buildJs, runDefaultCommand);
