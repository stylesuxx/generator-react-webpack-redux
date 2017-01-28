'use strict';
const Generator = require('yeoman-generator');

module.exports = class ComponentGenerator extends Generator {

  constructor() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  }

  writing() {
    // Build options
    let opts = {};

    if(this.options.stateless === true) {
      opts.stateless = true;
    }

    this.composeWith('react-webpack', {
      options: opts,
      args: [ this.options.name ]
    }, {
      local: require.resolve('generator-react-webpack/generators/component')
    });
  }
};
