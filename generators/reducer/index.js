'use strict';
let generator = require('yeoman-generator');
let utils = require('generator-react-webpack/utils/all');
let path = require('path');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);
  },

  writing: function() {

    let baseName = this.name;
    let destinationPath = path.join('src', 'reducers', baseName + '.js');
    let testDestinationPath = path.join('test', 'reducers', baseName + 'Test.js');

    // Copy the base store
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(destinationPath),
      {
        reducerName: baseName
      }
    );

    // Copy the unit test
    this.fs.copyTpl(
      this.templatePath('Test.js'),
      this.destinationPath(testDestinationPath),
      {
        reducerName: baseName
      }
    );
  }
});
