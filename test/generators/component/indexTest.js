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
      .on('end', callback);
  }

  describe('When creating a new component', () => {

    it('should create the component file', (done) => {
      createGeneratedComponent('testing', () => {
        assert.file(['src/components/TestingComponent.js']);
        done();
      });
    });

  });

});
