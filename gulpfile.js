const gulp = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const browserSync = require("browser-sync").create();

// Compiling tailwind CSS
gulp.task('style', () => {
  return gulp
    .src('./src/css/*.css')
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      require('autoprefixer'),
  ]))
    .pipe(gulp.dest('dist/css'));
});

// Starts a BrowerSync instance
gulp.task('serve', gulp.series('style', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  gulp.watch('./src/css/' + '*.css', gulp.series('style'));
  gulp.watch('./tailwind.config.js', gulp.series('style'));
  gulp.watch('./dist/' + '*.html').on('change', browserSync.reload);
}));

// Default Task
gulp.task("default", gulp.series("serve"));