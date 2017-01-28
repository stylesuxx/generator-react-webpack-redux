'use strict';
const Generator = require('yeoman-generator');

class ComponentGeneratorWrapper extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  writing() {
    this.composeWith(
      'generator-react-webpack/generators/component',
      { options: this.options, arguments: this.arguments },
      { local: require.resolve('generator-react-webpack') }
    );
  }
};

module.exports = ComponentGeneratorWrapper;
