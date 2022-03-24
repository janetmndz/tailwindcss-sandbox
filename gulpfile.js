const gulp = require('gulp');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const cleancss = require('gulp-clean-css');
const tailwindcss = require('tailwindcss');
const browserSync = require("browser-sync").create();

// Compiling tailwind CSS
gulp.task('style', () => {
  return gulp
    .src('./src/css/*.css')
    .pipe(postcss([tailwindcss('./tailwind.config.js'), require('autoprefixer')]))
    .pipe(purgecss({
        content: ['./dist/*.html']
    }))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

// Starts a BrowerSync instance
gulp.task('serve', gulp.series('style', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  gulp.watch('./dist/*.html', gulp.series('style'));
  gulp.watch('./src/css/*.css', gulp.series('style'));
  gulp.watch('./tailwind.config.js', gulp.series('style'));
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
}));

// Default Task
gulp.task('default', gulp.series('serve'));