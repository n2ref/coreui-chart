const gulp       = require('gulp');
const concat     = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify     = require('gulp-uglify');
const cleanCSS   = require('gulp-clean-css');
const wrapFile   = require('gulp-wrap-file');
const rename     = require("gulp-rename");



var conf = {
    dist: "./dist",
    js: {
        file: 'coreui-chart.min.js',
        src: [
            'src/js/coreui.chart.js',
            'src/js/coreui.chart.instance.js',
            'src/js/coreui.chart.apex.js',
            'src/js/coreui.chart.palette.js',
            'src/js/coreui.chart.utils.js',
            'src/js/types/*.js',
            'src/js/lang/*.js',
        ]
    },
    js_dependents: {
        dist: './src/js',
        src: [
            'node_modules/apexcharts/dist/apexcharts.min.js',
            'node_modules/google-palette/palette.js',
        ],
        rename: {
            'apexcharts.min' : 'coreui.chart.apex',
            'palette' : 'coreui.chart.palette'
        },
        wrapper: function(content, file) {
            if (file.path.indexOf('apexcharts.min.js') >= 0) {
                return "(function() {" +
                    "\"use strict\";" +
                    content + ";" +
                    "CoreUI.chart.apex = ApexCharts;" +
                    "})();"
            } else if (file.path.indexOf('palette.js') >= 0) {
                return "(function() {" +
                    content + ";" +
                    "CoreUI.chart.palette = palette;" +
                    "})();"
            }

            console.warn('!!! not found dependent wrapper for file: ' + file.path)
            return '';
        }
    },
    css: {
        file: 'coreui-panel.min.css',
        src: [
            'src/css/coreui.chart.css'
        ]
    }
};

gulp.task('build_css', function(){
    return gulp.src(conf.css.src)
               .pipe(sourcemaps.init())
               .pipe(cleanCSS())
               .pipe(concat(conf.css.file))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css_fast', function(){
    return gulp.src(conf.css.src)
               .pipe(sourcemaps.init())
               .pipe(concat(conf.css.file))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(conf.js.file, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_fast', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.js.file, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_dependents', function() {

    return gulp.src(conf.js_dependents.src)
        .pipe(wrapFile({
            wrapper: conf.js_dependents.wrapper
        }))
        .pipe(rename(function (path) {
            if (conf.js_dependents.rename.hasOwnProperty(path.basename)) {
                path.basename = conf.js_dependents.rename[path.basename];
            }
        }))
        .pipe(gulp.dest(conf.js_dependents.dist));
});


gulp.task('build_watch', function() {
    gulp.watch(conf.css.src, gulp.series(['build_css_fast']));
    gulp.watch(conf.js.src, gulp.parallel(['build_js_fast']));
});

gulp.task("default", gulp.series([ 'build_js', 'build_css' ]));