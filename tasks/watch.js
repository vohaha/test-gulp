'use strict';

var browserSync = require('browser-sync').create();
var paths = require('../sliceart_modules/paths.js');

module.exports = function(options) {

    return function() {

        browserSync.init({
            server: {
                baseDir: options.baseDir
            }
        });

        browserSync.watch(options.src || paths.dev.folder + '**/*.*').on('change', browserSync.reload);
    };

};