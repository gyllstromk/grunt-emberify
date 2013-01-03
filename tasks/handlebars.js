/*
 * grunt-handlebars-js
 * https://github.com/gyllstromk/grunt-handlebars-js
 *
 * Copyright (c) 2012 Karl Gyllstrom
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    var Handlebars = require('handlebars');

    var util = require('util'),
        path = require('path');

    function render(self, compiler, templateFormat) {
        var templates = {};

        grunt.file.expandFiles(self.file.src).forEach(function(each) {
            var templateName = path.basename(each, path.extname(each));
            if (templateName in templates) {
                grunt.log.error(util.format(
                    'Multiple templates with name "%s" (%s)', templateName, each));
            }

            templates[templateName] = compiler(grunt.file.read(each).toString());
        });

        grunt.file.write(self.target, grunt.utils._.keys(templates).map(function(templateName) {
            // grunt underscore library is old. should use `pairs`

            return util.format('Ember.TEMPLATES[\'%s\'] = ' +
                templateFormat, templateName, templates[templateName]);
        }).join('\n'));

        self.async()();
    }

    grunt.registerMultiTask('handlebars_embed', 'Precompile Handlebars templates', function() {
        render(this, function(each) {
            return each.replace(/"/g, '\\"').replace(/\n/g, ' ');
        }, 'Ember.Handlebars.compile("%s");');
    });

    grunt.registerMultiTask('handlebars_precompile', 'Embed Handlebars templates', function() {
        render(this, function(each) {
            return Handlebars.precompile(each);
        }, 'Ember.Handlebars.template(%s);');
    });
};
