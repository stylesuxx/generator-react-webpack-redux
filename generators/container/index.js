'use strict';
const Generator = require('yeoman-generator');
const utils = require('../app/utils');

class ContainerGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  writing() {
    const destination = utils.getDestinationPath(this.options.name, 'containers', 'js');
    const baseName = utils.getBaseName(this.options.name);
    const depth = this.options.name.split('/').length - 1;
    const prefix = '../'.repeat(depth);

    // Copy container template
    this.fs.copyTpl(
      this.templatePath('Container.js.jade'),
      this.destinationPath(destination),
      {
        name: baseName,
        prefix: prefix
      }
    );
  }
};

module.exports = ContainerGenerator;
