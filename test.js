'use strict';

const argv = require('minimist')(process.argv.slice(2));
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

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
