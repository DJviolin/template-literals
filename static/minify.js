'use strict';

const argv = require('minimist')(process.argv.slice(2));
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

/*const gulp = require('gulp');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');*/

if (argv['f'] !== undefined) {
} else {
  process.exitCode = 1;
  process.exit();
}

gulp.task('htmlmin', () =>
  gulp.src(argv['f'])
    .pipe(console.log(`argv['f'] === argv['f']`))
    .pipe(htmlmin({collapseWhitespace: true}))
    //.pipe(gulp.dest(process.stdout.write()))
);

if (argv['t'] === 'html') {
  //gulp.series('htmlmin')();
  process.stdout.write(argv.t);
} else if (argv['t'] === 'css') {
  process.stdout.write(argv.t);
} else if (argv['t'] === 'js') {
  process.stdout.write(argv.t);
} else {
  process.exitCode = 1;
  process.exit();
}


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
