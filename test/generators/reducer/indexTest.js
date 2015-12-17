'use strict';
let path = require('path');
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test

describe('react-webpack-redux:reducer', () => {

  describe('When creating a new reducer', () => {

    let generatorReducer = path.join(__dirname, '../../../generators/reducer');

    /**
     * Return a newly generated reducer with given name
     * @param {String} name
     * @param {Function} callback
     */
    function createGeneratedReducer(name, callback) {
      helpers.run(generatorReducer)
        .withArguments([name])
        .on('end', callback);
    }

    it('should create a reducer when invoked', (done) => {

      createGeneratedReducer('test', () => {
        assert.file([
          'src/reducers/test.js'
        ]);

        done();
      });
    });

    it('should create the reducers unit test', (done) => {

      createGeneratedReducer('test', () => {
        assert.file([
          'test/reducers/testTest.js'
        ]);

        done();
      });
    });
  });
});
