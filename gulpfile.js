const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(sass|scss)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

gulp.task('watchSass', function(){
    gulp.watch('src/sass/**/*.+(sass|scss)', gulp.parallel("styles"))
    gulp.watch('src/*.html').on("change", browserSync.reload)
});
// Задача для отслеживания изменений в JS файлах и обновления браузера
gulp.task('watchJS', function() {
    gulp.watch('src/js/*.js').on('change', browserSync.reload); // Отслеживаем изменения в JS и обновляем браузер
});

// Задача для отслеживания изменений в HTML файлах и обновления браузера
gulp.task('watchHTML', function() {
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watchSass', 'watchJS', 'server', 'styles'));