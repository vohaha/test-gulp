'use strict';

var $ = require('gulp-load-plugins')();
var paths = require('../../sliceart_modules/paths.js');
var gulp = require('gulp');

module.exports = function (options) {

    var isProduction = options.isProduction || false;

    return function () {
        return gulp.src(options.src || paths.dev.sass.pathToFiles)
            .pipe($.plumber({
                errorHandler: $.notify.onError(function (err) {
                    return {
                        title: 'Styles assembly error',
                        message: err.message
                    };
                })
            }))
            .pipe($.if(!isProduction, $.sourcemaps.init()))
            .pipe($.sassGlob())
            .pipe($.stylelint({
                reporters: [
                    {formatter: 'string', console: true}
                ]
            }))
            .pipe($.sass())
            .pipe($.postcss(options.postProcessors || []))
            .pipe($.if(isProduction, $.csso()))
            .pipe($.if(!isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(options.dest || paths.dev.css.pathToFolder));
    };

};