const gulp             = require('gulp');
const concat           = require('gulp-concat');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const sass             = require('gulp-sass')(require('sass'));
const rollup           = require('@rollup/stream');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const rollupBabel      = require('@rollup/plugin-babel');
const rollupCommonjs   = require('@rollup/plugin-commonjs');
const rollupResolve    = require('@rollup/plugin-node-resolve');
const source           = require('vinyl-source-stream');
const buffer           = require("vinyl-buffer");


var conf = {
    dist: "./dist",
    js: {
        fileMin: 'coreui-chart.min.js',
        file: 'coreui-chart.js',
        main: 'src/main.js',
        src: 'src/js/**/*.js'
    },
    css: {
        fileMin: 'coreui-chart.min.css',
        file: 'coreui-chart.css',
        main: 'src/main.scss',
        src: [
            'src/css/*.scss',
        ]
    }
};


gulp.task('build_css_min', function(){
    return gulp.src(conf.css.main)
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['node_modules'], outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat(conf.css.fileMin))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css_min_fast', function(){
    return gulp.src(conf.css.main)
        .pipe(sass({includePaths: ['node_modules']}).on('error', sass.logError))
        .pipe(concat(conf.css.fileMin))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css', function(){
    return gulp.src(conf.css.main)
        .pipe(sass({includePaths: ['node_modules']}).on('error', sass.logError))
        .pipe(concat(conf.css.file))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_js_min', function() {

    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: false,
            format: 'umd',
            name: "CoreUI.chart"
        },
        context: "window",
        plugins: [
            rollupResolve(),
            rollupCommonjs(),
            rollupSourcemaps(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.fileMin))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify({
            mangle: {
                reserved: ['ChartInstance']
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_min_fast', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: false,
            format: 'umd',
            name: "CoreUI.chart"
        },
        context: "window",
        plugins: [
            rollupResolve(),
            rollupCommonjs(),
            rollupSourcemaps(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.fileMin))
        .pipe(buffer())
        .pipe(gulp.dest(conf.dist));
});



gulp.task('build_js', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: false,
            format: 'umd',
            name: "CoreUI.chart"
        },
        context: "window",
        plugins: [
            rollupResolve(),
            rollupCommonjs(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.file))
        .pipe(buffer())
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_watch', function() {
    gulp.watch(conf.css.src, gulp.series(['build_css_min_fast']));
    gulp.watch(conf.js.src, gulp.parallel(['build_js_fast']));
});

gulp.task("default", gulp.series([ 'build_js', 'build_css' ]));