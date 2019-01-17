//****** Modules ******//
const gulp = require('gulp');
const { src, dest,
        series, parallel,
        watch } = gulp;
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const csso = require('gulp-csso');
const del = require('del');
const htmlreplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const maps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

//****** Tasks ******//
//Concat and Minify JS
function formatJS() {
  return src(['js/circle/autogrow.js',
              'js/circle/circle.js',
              'js/global.js'])
          .pipe(maps.init())
          .pipe(concat('all.js'))
          .pipe(uglify())
          .pipe(rename('all.min.js'))
          .pipe(maps.write('./'))
          .pipe(dest('dist/scripts'));
}
//Compile Sass and Minify
function formatCSS() {
  return src('sass/global.scss')
          .pipe(maps.init())
          .pipe(rename('all.css'))
          .pipe(sass())
          .pipe(csso())
          .pipe(rename('all.min.css'))
          .pipe(maps.write('./'))
          .pipe(dest('dist/styles'));
}
//Compress Images
function images() {
  return src('images/**/*.{jpg,png}')
         .pipe(imagemin())
         .pipe(dest('dist/content'));
}
//Copy Task
function copyFiles() {
  return src(['icons/**'], {base: './'})
         .pipe(dest('dist'));
}
//Update HTML for production
function updateHTML() {
  return src('index.html')
          .pipe(htmlreplace({
            css: 'styles/all.min.css',
            js: 'scripts/all.min.js',
            mImg: {
              src: 'content/m-spore.png',
              tpl: '<img src="%s" />'
            },
            fImg: {
              src: 'content/f-spore.png',
              tpl: '<img src="%s" />'
            },
            Img1: {
              src: 'content/1.jpg',
              tpl: '<img src="%s" />'
            },
            Img2: {
              src: 'content/2.jpg',
              tpl: '<img src="%s" />'
            },
            Img3: {
              src: 'content/3.jpg',
              tpl: '<img src="%s" />'
            }

          }))
          .pipe(dest('dist'));
}
//Server and Watch Tasks
function serve(cb) {
    connect.server({
      port: 3000,
      root: 'dist',
      livereload: true
    });
    cb();
}

function reload() {
  return src('dist/*.html')
         .pipe(connect.reload());
}

function watchSass(cb) {
  watch('sass/**/*.scss', series(formatCSS, reload));
  cb();
}
//Clean Task
function clean() {
  return del(['dist/', 'tmp/']);
}

//****** Task Export ******//
exports.scripts = formatJS;
exports.styles = formatCSS;
exports.images = images;
exports.clean = clean;
exports.build = series(
  clean,
  parallel(
    formatJS,
    formatCSS,
    images, 
    copyFiles,
    updateHTML
  )
);
exports.default = series(
  clean,
  parallel(
    formatJS,
    formatCSS,
    images, 
    copyFiles,
    updateHTML
  ),
  series(
    serve, watchSass
  )
);
