/**
 * @module app/config
 * @description Application Configuration
 * @returns {object} config
 */

/** NPM modules */
var _ = require('lodash'),
    glob = require('glob'),
    chalk = require('chalk');

/** configurations */
let config = require('./env/default');
config = Object.assign({}, config, require('./env/' + process.env.WINGS_ENVIRONMENT));
module.exports = config;

/** @function
 * @name getPaths
 * @description It will find the absolute paths for the patters
 * @param {Array} patterns
 * @returns {Array} absolute paths
 */
module.exports.getPaths = function (globPatterns, excludes) {
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i'),
        self = this,
        // The output array
        output = [];

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, self.getPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (var i in excludes) {
                            file = file.replace(excludes[i], '');
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};