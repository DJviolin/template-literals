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
  process.stderr.write(`ERROR (minify.js): Your ${file} file is undefined or not exist.\n`);
  process.exitCode = 1;
  process.exit();
}

gulp.task('htmlmin', () => {
  const readable = gulp.src(file)
    .pipe(replace(/http:\/\/127\.0\.0\.1\/public_html\/lantosistvan/g, '.'))
    .pipe(replace(/\/\/127\.0\.0\.1\/public_html\/lantosistvan/g, '.'))
    .pipe(replace(/http:\\\/\\\/127\.0\.0\.1\\\/public_html\\\/lantosistvan/g, '.'))
    .pipe(replace(/http%253A%252F%252F127\.0\.0\.1%252Fpublic_html%252Flantosistvan/g, '.'))
    //.pipe(replace(/\.\/lantosistvan/g, `./${sitename}`))
    //.pipe(replace(/\.\\\/lantosistvan/g, `.\\/${sitename}`))
    //.pipe(replace(/\.%252Flantosistvan/g, `.%252F${sitename}`))
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
  readable.on('error', (chunk) => {
    process.stderr.write(`ERROR (htmlmin): ${chunk}\n`);
    process.exitCode = 1;
    process.exit();
  });
  readable.on('data', (chunk) => {
    // https://nodejs.org/api/stream.html#stream_event_data
    // http://stackoverflow.com/a/24470353/1442219
    //process.stdout.write(JSON.stringify(chunk.contents.toString().trim(), null, 4));
    process.stdout.write(`${chunk._contents}\n`);
  });
});

// https://github.com/jakubpawlowicz/clean-css#constructor-options
// ERROR: Ignoring local @import of "fonts.css" as resource is missing.
// Fix the issue:
// https://github.com/jakubpawlowicz/gulp-clean-css-v4-example/blob/master/gulpfile.js
// https://github.com/jakubpawlowicz/clean-css/issues/914#issuecomment-287727453
// https://github.com/jakubpawlowicz/clean-css#inlining-options
gulp.task('minify-css', () => {
  const readable = gulp.src(file)
    .pipe(cleanCSS({
      compatibility: '*',
      inline: ['none'],
    }));
  readable.on('error', (chunk) => {
    process.stderr.write(`ERROR (minify-css): ${chunk}\n`);
    process.exitCode = 1;
    process.exit();
  });
  readable.on('data', (chunk) => {
    process.stdout.write(`${chunk._contents}\n`);
  });
});

gulp.task('uglify', () => {
  const readable = gulp.src(file)
    .pipe(uglify());
  readable.on('error', (chunk) => {
    process.stderr.write(`ERROR (uglify): ${chunk}\n`);
    process.exitCode = 1;
    process.exit();
  });
  readable.on('data', (chunk) => {
    process.stdout.write(`${chunk._contents}\n`);
  });
});

if (task === 'html') {
  gulp.series('htmlmin')();
} else if (task === 'css') {
  gulp.series('minify-css')();
} else if (task === 'js') {
  gulp.series('uglify')();
} else {
  process.stderr.write(`ERROR (minify.js): Your ${task} task is undefined or not exist.\n`);
  process.exitCode = 1;
  process.exit();
}
