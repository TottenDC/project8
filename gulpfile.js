const { src, dest,
        series, parallel,
        watch } = require('gulp');
const maps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');


//Tasks
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

function styles() {

}

function images() {

}

function clean() {
  return del(['dist/', 'tmp/']);
}

//Exports
exports.scripts = series(
  concatJS, minifyJS
);
exports.styles = styles;
exports.images = images;
exports.clean = clean;
exports.build = series(
  clean,
  parallel(
    series(concatJS, minifyJS),
    styles, images)
);
