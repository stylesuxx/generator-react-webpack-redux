'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

describe('react-webpack-redux:root', () => {

  let generatorDispatcher = path.join(__dirname, '../../../generators/root');

  /**
   * Return a newly generated dispatcher with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedDispatcher(name, callback) {
    helpers.run(generatorDispatcher)
      .withArguments([name])
      .on('end', callback);
  }

  it('should create the root reducer, redux store, base container and custom index.js', (done) => {

    createGeneratedDispatcher('Dispatcher', () => {

      assert.file([
        'src/index.js',
        'src/stores/index.js',
        'src/reducers/index.js',
        'src/containers/App.js'
      ]);

      done();
    });
  });

});
