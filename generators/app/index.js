'use strict';
let generator = require('yeoman-generator');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);

    this.option('skip-install');
  },

  install: function() {

    if(!this.options['skip-install']) {
      this.installDependencies({ bower: false });
    }

    // Run the base react-webpack generator, then run the dispatcher
    this.composeWith(
      'react-webpack',
      {
        options: {
          'skip-install': this.options['skip-install']
        }
      },
      {
        local: require.resolve('generator-react-webpack'),
        link: 'strong'
      }
    ).on('end', () => {

      // Run the create root method
      this.composeWith('react-webpack-redux:root', {
        args: ['Root']
      });

      // Install redux and react bindings as requirement
      this.npmInstall(['redux', 'react-redux'], { 'save': true });

      // Rewrite the webpack version the the last know working beta version
      // It is left here in plain sight, to remind about the pain updating to
      // a master branch without checking for the actual version.
      //
      // TODO: throw this out as soon as the next stable version is released
      this.npmInstall(['webpack@2.1.0-beta.6'], { 'save-dev': true });
    });
  }
});
