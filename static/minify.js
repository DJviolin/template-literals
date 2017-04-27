'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

/*const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');*/

const file = process.argv[2];
const task = process.argv[3];

if (file !== undefined) {
} else {
  process.exitCode = 1;
  process.exit();
}

gulp.task('htmlmin', () => {
  const a = gulp.src(file)
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
  a.on('data', (chunk) => {
    // https://nodejs.org/api/stream.html#stream_event_data
    // http://stackoverflow.com/a/24470353/1442219
    //process.stdout.write(`${chunk.contents.toString().trim()}`);
    process.stdout.write(chunk.contents);
  });
});

if (task === 'html') {
  gulp.series('htmlmin')();
} else if (task === 'css') {
} else if (task === 'js') {
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

gulp.task('app', gulp.parallel('css', 'uglify'));*/
