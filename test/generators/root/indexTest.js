'use strict';
let path = require('path');
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test

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

  it('should create the root reducer, redux store, base container and custom run.js', (done) => {

    createGeneratedDispatcher('Dispatcher', () => {

      assert.file([
        'src/stores/index.js',
        'src/reducers/index.js',
        'src/components/run.js',
        'src/containers/App.js'
      ]);

      done();
    });
  });

});
