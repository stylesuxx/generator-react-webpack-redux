'use strict';
let generator = require('yeoman-generator');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);
  },

  writing: function() {
    /* Some base functionality needs to be overwritten, so we force yeoman to do
     * so. This is not the nicest thing to do, but since this changes are needed
     * it does not make sense to give the user a choice.
     */
    this.conflicter.force = true;

    // Copy the store
    this.fs.copy(
      this.templatePath('store.js'),
      this.destinationPath(`src/stores/index.js`)
    );

    // Copy the root reducer
    this.fs.copy(
      this.templatePath('reducer.js'),
      this.destinationPath(`src/reducers/index.js`)
    );

    // Copy the run script over the original run script.
    this.fs.copy(
      this.templatePath('run.js'),
      this.destinationPath(`src/components/run.js`)
    );

    // Copy the app container
    this.fs.copy(
      this.templatePath('App.js'),
      this.destinationPath(`src/containers/App.js`)
    );
  }
});
