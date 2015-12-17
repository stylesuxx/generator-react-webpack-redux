'use strict';
let generator = require('yeoman-generator');
let utils = require('generator-react-webpack/utils/yeoman');
let path = require('path');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);
  },

  writing: function() {

    let baseName = this.name.trim();
    let destinationPath = path.join('src', 'actions', baseName + '.js')
    let constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();

    this.fs.copyTpl(
      this.templatePath('Action.js'),
      this.destinationPath(destinationPath),
      {
        actionName: baseName,
        actionConstant: constantName
      }
    );
  }
});
