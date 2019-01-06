//****** Modules ******//
const { src, dest,
        series, parallel,
        watch } = require('gulp');
const maps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');


//****** Tasks ******//
//JS Tasks
function concatJS() {
  return src(['js/circle/autogrow.js',
              'js/circle/circle.js',
              'js/global.js'])
          .pipe(maps.init())
          .pipe(concat('all.js'))
          .pipe(maps.write('../dist/scripts'))
          .pipe(dest('tmp'));
}

function minifyJS() {
  return src('tmp/all.js')
         .pipe(uglify())
         .pipe(rename('all.min.js'))
         .pipe(dest('dist/scripts'));
}
//CSS Tasks
function compileSass() {
  return src('sass/global.scss')
         .pipe(rename('all.css'))
         .pipe(maps.init())
         .pipe(sass())
         .pipe(maps.write('../dist/styles'))
         .pipe(dest('tmp'));
}

function minifySass() {
  return src('tmp/all.css')
         .pipe(csso())
         .pipe(rename('all.min.css'))
         .pipe(dest('dist/styles'));
}
//Compress Images
function images() {
  return src('images/**/*.{jpg,png}')
         .pipe(imagemin())
         .pipe(dest('dist/content'));
}
//Copy Tasks
function copyIcons() {
  return src(['icons/**'], {base: './'})
         .pipe(dest('dist'));
}

function htmlTransfer() {
  return src('*.html')
         .pipe(dest('dist'))
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
  watch('sass/**/*.scss', series(compileSass, minifySass, reload));
  cb();
}
//Clean Task
function clean() {
  return del(['dist/', 'tmp/']);
}



//****** Task Export ******//
exports.scripts = series(
  concatJS, minifyJS
);
exports.styles = series(
  compileSass, minifySass
);
exports.images = images;
exports.clean = clean;
exports.build = series(
  clean,
  parallel(
    series(concatJS, minifyJS),
    series(compileSass, minifySass),
    images, copyIcons, htmlTransfer
  )
);
exports.default = series(
  clean,
  parallel(
    series(concatJS, minifyJS),
    series(compileSass, minifySass),
    images, copyIcons, htmlTransfer
  ),
  series(
    serve, watchSass
  )
);
