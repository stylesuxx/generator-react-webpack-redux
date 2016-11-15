const generator = require('yeoman-generator');
const fs = require('fs');

module.exports = generator.Base.extend({

  constructor: function constructor() {
    generator.Base.apply(this, arguments); // eslint-disable-line prefer-rest-params
    this.argument('name', { type: String, required: true });
  },

  /*
  conflicts: function configuring() {
    // Rewrite the webpack version the the last know working beta version
    // It is left here in plain sight, to remind about the pain updating to
    // a master branch without checking for the actual version.
    //
    // TODO: throw this out as soon as the next stable version is released
    if(fs.existsSync(this.destinationPath('package.json'))) {
      var config = JSON.parse(fs.readFileSync(this.destinationPath('package.json')));
      config.devDependencies.webpack = '=2.1.0-beta.6';
      fs.writeFileSync(this.destinationPath('package.json'), JSON.stringify(config));
    }
  },
  */

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
