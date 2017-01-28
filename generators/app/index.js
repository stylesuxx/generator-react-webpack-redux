'use strict';
const Generator = require('yeoman-generator');

class AppGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.option('skip-install');
  }

  install() {
    if(!this.options['skip-install']) {
      this.installDependencies({ bower: false });
    }

    // Run the base react-webpack generator, then run the dispatcher
    this.composeWith(
      'generator-react-webpack',
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
    });
  }
};

module.exports = AppGenerator;
