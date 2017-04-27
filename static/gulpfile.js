'use strict';

/*const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');*/

const argv = require('minimist')(process.argv.slice(2));
//console.dir(argv);

if (argv['f'] !== undefined) {
  process.stdout.write(argv.f);
}

if (argv['t'] !== undefined) {
  process.stdout.write(argv.t);
}



//const filename = process.argv[2];
//const task = process.argv[3];
//const output = process.argv[4];

//process.stdout.write(`filename === ${filename}\ntask === ${task}\noutput === ${output}`);

/*gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});*/


// MINIFY CSS
// http://goalsmashers.github.io/css-minification-benchmark/
/*gulp.task('minify-css', () =>
  gulp.src(paths.styles.css)
    .pipe(cleanCSS({ compatibility: '*', debug: true }, details =>
      console.log('%s: The file was reduced from %s bytes to %s bytes. This means %s% reduction in size!',
        details.name,
        details.stats.originalSize,
        details.stats.minifiedSize,
        Math.round(details.stats.efficiency * 100)
      )
    ))
    .pipe(rename({ basename: 'style', extname: '.min.css' }))
    .pipe(gulp.dest('app/public/stylesheets'))
);

gulp.task('css', gulp.series('minify-css'));

gulp.task('uglify', () =>
  gulp.src(paths.uglify)
    .pipe(uglify({ output: { quote_style: 1 } }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('app/public/javascripts'))
);

gulp.task('app', gulp.parallel('css', 'uglify'));

if () {}*/
