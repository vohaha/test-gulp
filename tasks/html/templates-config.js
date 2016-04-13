'use strict';

var $ = require('gulp-load-plugins')();
var paths = require('../../sliceart_modules/paths.js');
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var fs = require('fs');
var through2 = require('through2').obj;
var date = new Date();

module.exports = function (options) {

    return function () {

        return gulp.src(paths.dev.jade.pathToFolder + '**/*.json')
            .pipe($.plumber({
                errorHandler: $.notify.onError(function (err) {
                    return {
                        title: 'Jade template error',
                        message: err.message
                    };
                })
            }))
            .pipe(
                through2(function (file, enc, callback) {
                    gulp.src(path.parse(file.path).dir + paths.dev.jade.files)
                        .pipe($.insert.append('//' + date))
                        .pipe(gulp.dest(paths.dev.jade.pathToFolder));
                    callback(null, file);
                })
            )
            .pipe($.mergeJson('index.json'))
            .pipe(gulp.dest(options.dest || paths.dev.jade.pathToFolder));
    };

};