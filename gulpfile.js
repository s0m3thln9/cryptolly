const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');
//const svgSprite = require('gulp-svg-sprite');

const imgDist = 'app/img/dist';

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'));
}

function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(newer('app/fonts'))
        .pipe(fonter({
            formats: ['woff', 'ttf'],
            hinting: true
        }))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(newer('app/fonts'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}       

function styles() {
    return src('app/scss/style.scss')
        .pipe(autoPrefixer({overrideBrowserlist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return src([
        'app/js/*.js',
        '!app/js/main.min.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function imagesAvif() {
    return src(['app/img/src/*.*', '!app/img/src/*.svg'])
        .pipe(newer(imgDist))
        .pipe(avif({ quality: 50 }))
        .pipe(dest(imgDist))
}

function imagesWebp() {
    return src(['app/img/src/*.*'])
        .pipe(newer(imgDist))
        .pipe(webp())
        .pipe(dest(imgDist))
}

function imagesMin() {
    return src(['app/img/src/*.*'])
        .pipe(newer(imgDist))
        .pipe(imagemin())
        .pipe(dest(imgDist))
}

// function sprite() {
//     return src(['app/img/dist/*.svg'])
//         .pipe(svgSprite({
//             mode: {
//                 stack: {
//                     sprite: "../sprite.svg"  //sprite file name
//                 }
//             },
//         }))
//         .pipe(dest(imgDist))
// }

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    watch(['app/img/src'], imagesAvif);
    watch(['app/img/src'], imagesWebp);
    watch(['app/img/src'], imagesMin);
    watch(['app/scss/style.scss'], styles);
    watch(['app/js/main.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
    return(
        src('dist')
        .pipe(clean())
    );
}

function building() {
    return(
        src([
            'app/img/**/*.*',
            'app/css/style.min.css',
            'app/css/fonts.css',
            'app/js/main.min.js',
            'app/fonts/*.*',
            'app/**/*.html'
        ], {base: 'app'})
        .pipe(dest('dist'))
    );
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.imagesAvif = imagesAvif;
exports.imagesWebp = imagesWebp;
exports.imagesMin = imagesMin;
exports.fonts = fonts;
//exports.sprite = sprite;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, imagesAvif, imagesWebp, imagesMin, fonts, pages, watching);