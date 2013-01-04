# grunt-emberify: Precompile your Ember Handlebars and assign to Ember.TEMPLATES

Precompile handlebars templates to a single JS file where templates are saved to Ember.TEMPLATES.

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with:

    npm install grunt-emberify

Then add this line to your project's `grunt.js` gruntfile:

Usage:
```js

  grunt.initConfig({
      handlebars_embed: {

      // includes templates as:
      // Ember.TEMPLATES[<name>] = Ember.Handlebars.compile(<template content>);

          'allMyTemplates.js': [ 'client/lib/**.handlebars' ]
      },

      /* ... OR ... */

      handlebars_precompile: {

      // Compiles templates.
      // Includes as:
      // Ember.TEMPLATES[<name>] = Ember.Handlebars.template(<compiled content>);

          'allMyTemplates.js': [ 'client/lib/**.handlebars' ]
      },

      /* ... */

  });

  grunt.loadNpmTasks('grunt-emberify');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## License
Copyright (c) 2012 Karl Gyllstrom  
Licensed under the MIT license.
