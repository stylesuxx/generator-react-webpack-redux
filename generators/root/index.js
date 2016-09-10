const generator = require('yeoman-generator');

module.exports = generator.Base.extend({

  constructor: function constructor() {
    generator.Base.apply(this, arguments); // eslint-disable-line prefer-rest-params
    this.argument('name', { type: String, required: true });
  },

  writing: function writing() {
    /* Some base functionality needs to be overwritten, so we force yeoman to do
     * so. This is not the nicest thing to do, but since this changes are needed
     * it does not make sense to give the user a choice.
     */
    this.conflicter.force = true;

    // Copy the store
    this.fs.copy(
      this.templatePath('store.js'),
      this.destinationPath('src/stores/index.js')
    );

    // Copy the root reducer
    this.fs.copy(
      this.templatePath('reducer.js'),
      this.destinationPath('src/reducers/index.js')
    );

    // Copy the actions const template
    this.fs.copy(
      this.templatePath('./action/const.js'),
      this.destinationPath('src/actions/const.js')
    );

    // Copy the actions export template
    this.fs.copy(
      this.templatePath('./action/index.js'),
      this.destinationPath('src/actions/index.js')
    );

    // Copy the entry point over the original entry point
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js')
    );

    // Copy the app container
    this.fs.copy(
      this.templatePath('App.js'),
      this.destinationPath('src/containers/App.js')
    );

    // Copy the adapted eslintrc
    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    );
  }
});
