'use strict';
let generator = require('yeoman-generator');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);
  },

  writing: function() {

    // Copy the store
    this.fs.copyTpl(
      this.templatePath('store.js'),
      this.destinationPath(`src/stores/store.js`)
    );

    // Copy the root reducer
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`src/reducers/index.js`)
    );
  }
});
