const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');

// Compiling tailwind CSS
gulp.task('style', () => {
  return gulp
    .src('src/css/**.css')
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      require('autoprefixer'),
  ]))
    .pipe(gulp.dest('dist/css'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',gulp.series('style'));
});