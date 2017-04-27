'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');

const file = process.argv[2];
const task = process.argv[3];

if (file !== undefined) {
} else {
  process.exitCode = 1;
  process.exit();
}

gulp.task('htmlmin', () => {
  const readable = gulp.src(file)
    .pipe(replace(/http:\/\/127\.0\.0\.1\/public_html\//igm, './'))
    .pipe(replace(/\/\/127\.0\.0\.1\/public_html\//igm, './'))
    .pipe(replace(/class/igm, 'classsss'))
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      html5: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      processScripts: ['text/html'],
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true,
    }));
  readable.on('data', (chunk) => {
    // https://nodejs.org/api/stream.html#stream_event_data
    // http://stackoverflow.com/a/24470353/1442219
    //process.stdout.write(`${chunk.contents.toString().trim()}`);
    process.stdout.write(chunk.contents);
  });
});

gulp.task('minify-css', () => {
  const readable = gulp.src(file)
    .pipe(cleanCSS({
      // https://github.com/jakubpawlowicz/clean-css#constructor-options
      compatibility: '*',
    }));
  readable.on('data', (chunk) => {
    process.stdout.write(chunk.contents);
  });
});

gulp.task('uglify', () => {
  const readable = gulp.src(file)
    .pipe(uglify());
  readable.on('data', (chunk) => {
    process.stdout.write(chunk.contents);
  });
});

if (task === 'html') {
  gulp.series('htmlmin')();
} else if (task === 'css') {
  gulp.series('minify-css')();
} else if (task === 'js') {
  gulp.series('uglify')();
} else {
  process.exitCode = 1;
  process.exit();
}

/*gulp.task('uglify', () =>
  gulp.src(paths.uglify)
    .pipe(uglify({ output: { quote_style: 1 } }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('app/public/javascripts'))
);

gulp.task('app', gulp.parallel('css', 'uglify'));*/
