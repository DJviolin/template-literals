'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');

const file = process.argv[2];
const task = process.argv[3];
const sitename = process.argv[4];

if (file !== undefined) {
} else {
  process.exitCode = 1;
  process.exit();
}

gulp.task('htmlmin', () => {
  const readable = gulp.src(file)
    .pipe(replace(/http:\/\/127\.0\.0\.1\/public_html\//g, './'))
    .pipe(replace(/\/\/127\.0\.0\.1\/public_html\//g, './'))
    .pipe(replace(/http:\\\/\\\/127\.0\.0\.1\\\/public_html\\\//g, '.\\/'))
    .pipe(replace(/http%253A%252F%252F127\.0\.0\.1%252Fpublic_html%252F/g, '.%252F'))
    .pipe(replace(/\.\/lantosistvan/g, `./${sitename}`))
    .pipe(replace(/\.\\\/lantosistvan/g, `.\\/${sitename}`))
    .pipe(replace(/\.%252Flantosistvan/g, `.%252F${sitename}`))
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
    process.stdout.write(chunk._contents.toString().trim());
  });
});

// https://github.com/jakubpawlowicz/clean-css#constructor-options
gulp.task('minify-css', () => {
  const readable = gulp.src(file)
    .pipe(cleanCSS({
      compatibility: '*',
    }));
  readable.on('data', (chunk) => {
    //process.stdout.write(chunk.contents);
    //process.stdout.write(JSON.stringify(chunk._contents.toString().trim(), null, 4));
    process.stdout.write(chunk._contents.toString().trim());
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
