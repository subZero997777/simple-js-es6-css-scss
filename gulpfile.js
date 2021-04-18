'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');
   sass.compiler = require('node-sass');

const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');

// define entry for browserify
const jsSrc = 'app.js';
const jsFolder = './js/source/';

const srcFiles = {
   jsPath: './js/source/**/*.js',
   jsFiles: './js/source/',
 }
 const distFiles = {
   distJSPath: './js/dist/',
 };

 const destFolder = './';
 
// we can add a script for front-end and script for back-end and so on
const jsFiles = [jsSrc];

const production = false;

const watchSass = gulp.watch(['./sass/**/*.scss']);
const watchJS   = gulp.watch(['./js/source/**/*.js']);

const compileSass = function (cb) {
   console.log('running compileSass.. ');
    return gulp.src('./sass/**/*.scss')
    .pipe(concat('custom.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    //stream chnages to all browser
		.pipe(browserSync.stream())
    cb();
 }

 const watchSassFolder = function (cb) {
   console.log('init watch..'); 
   watchSass.on('change', compileSass);
   cb();
 }

 const watchJSFolder = function(cb){
  console.log('init JS watch..'); 
  watchJS.on('change',  jsTask);
  browserSync.init({
		server : {
			baseDir: destFolder
		}
	});
  cb();   
}

async function jsTask() {
   jsFiles.map(function (entry) {
     return (
       browserify({
            entries: [ jsFolder + entry ],
            debug: true 
          })
         // tranform babelify [env] -> transpiler 
         .transform(babelify, { presets: ['@babel/preset-env'] })
         // tranform babelify [env] -> transpiler 
         .bundle()
         .pipe(source(entry))
         .pipe( rename({extname: '.min.js'}) )
         .pipe(buffer())
         .pipe(sourcemaps.init({loadMaps: true}))
         .pipe( uglify() )
         // sourcemap 
         .pipe(sourcemaps.write('./'))
         .pipe(gulp.dest(distFiles.distJSPath))
         //stream chnages to all browser
		     .pipe(browserSync.stream())
     );
   });
 }

 // my js task
function jsTask2() {
  return (
    gulp.src([srcFiles.jsPath])
      // To load existing source maps
      // This will cause sourceMaps to use the previous sourcemap to create an ultimate sourcemap
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(
        babel({
          presets: ['@babel/preset-env'],
        })
      )
      .pipe(concat('bundle.js'))
      //.pipe(gulpif(production, rename({ extname: '.min.js' })))
      //.pipe(gulpif(production, uglify()))
      .pipe( sourcemaps.write('./'))
      .pipe(gulp.dest(distFiles.distJSPath))
  );
}


gulp.task('sass', gulp.series([compileSass]));
//gulp.task('compileJS', gulp.series([convertJS]));
gulp.task('doBrowserify', gulp.series([jsTask]));
gulp.task('sass:watch', watchSassFolder);
gulp.task('js:watch', watchJSFolder);

gulp.task('default', gulp.series(['sass','doBrowserify', 'sass:watch', 'js:watch']));
