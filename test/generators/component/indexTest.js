'use strict';
const path = require('path');
const assert = require('yeoman-assert'); // eslint-disable-line
const helpers = require('yeoman-test'); // eslint-disable-line

describe('react-webpack-redux:component', () => {
  const generatorComponent = path.join(__dirname, '../../../generators/component');

  /**
   * Return a newly generated Component with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedComponent(name, callback) {

    helpers.run(generatorComponent)
      .withArguments([name])
      .on('ready', (instance) => {
        instance.config.set('style', 'css');
        instance.config.set('cssmodules', true);
        instance.config.set('generatedWithVersion', 4);
      })
      .on('end', callback);
  }

  describe('When creating a new component', () => {

    it('should create the component file', (done) => {
      createGeneratedComponent('testing', () => {
        // TODO: during testing it seems the V3 template is used
        //       configuration from above does not seem to do anything
        assert.file(['src/components/TestingComponent.js']);
        done();
      });
    });

  });

});
