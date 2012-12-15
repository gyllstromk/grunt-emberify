/*
 * grunt-handlebars-js
 * https://github.com/gyllstromk/grunt-handlebars-js
 *
 * Copyright (c) 2012 Karl Gyllstrom
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    var Handlebars = require('handlebars');
    var fs = require('fs'),
        util = require('util'),
        path = require('path');

    grunt.registerMultiTask('handlebars', 'Precompile Handlebars templates', function() {
        var templates = {};

        grunt.file.expandFiles(this.file.src).forEach(function(each) {
            var templateName = path.basename(each, path.extname(each));
            if (templateName in templates) {
                grunt.log.error(util.format(
                    'Multiple templates with name "%s" (%s)', templateName, each));
            }

            templates[templateName] =
                Handlebars.precompile(fs.readFileSync(each).toString());
        });

        fs.writeFile(this.target, grunt.utils._.keys(templates).map(function(templateName) {
            // grunt underscore library is old. should use `pairs`

            return util.format('Ember.TEMPLATES[\'%s\'] = %s\n', templateName,
                templates[templateName]);
        }), this.async());
    });
};
