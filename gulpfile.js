const gulp = require("gulp");
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});

gulp.task('css', () => {
    return gulp.src('src/styles/*.css')
        .pipe(concat('all.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
});

gulp.task('html', () => {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('default', gulp.series('js', 'css', 'html', 'images'));