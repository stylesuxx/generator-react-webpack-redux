'use strict';
const Generator = require('yeoman-generator');

class AppGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.option('skip-install');
  }

  prompting() {
    return this.prompt([{
      type: 'confirm',
      name: 'thunk',
      message: 'Would you like to include redux-thunk?',
      default: false,
      store: true,
    }]).then(answers => {
      this.thunk = answers.thunk;
    });
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
        args: ['Root'],
        thunk: this.thunk,
      });

      // Install redux and react bindings as requirement and redux-thunk optionally
      let packages = ['redux', 'react-redux'];

      if (this.thunk) {
        packages.push('redux-thunk');
      }

      this.npmInstall(packages, { 'save': true });
    });
  }
};

module.exports = AppGenerator;
