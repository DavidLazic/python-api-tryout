var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

gulp.task('env:development', function () {
    gulp.src('env.config.json')
        .pipe(gulpNgConfig('tsApp.env', {
            environment: 'development'
        }))
        .pipe(gulp.dest('./src/app'));
});

gulp.task('env:production', function () {
    gulp.src('env.config.json')
        .pipe(gulpNgConfig('tsApp.env', {
            environment: 'production'
        }))
        .pipe(gulp.dest('./src/app'));
});

gulp.task('env:uat', function () {
    gulp.src('env.config.json')
        .pipe(gulpNgConfig('tsApp.env', {
            environment: 'uat'
        }))
        .pipe(gulp.dest('./src/app'));
});
