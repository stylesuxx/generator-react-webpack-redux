'use strict';
let path = require('path');
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test;
let fs = require('fs-extra');

describe('react-webpack-redux:reducer', () => {

  describe('When creating a new reducer', () => {

    const generatorReducer = path.join(__dirname, '../../../generators/reducer');
    const reducerSource = path.join(__dirname, '../../../generators/root/templates/reducer.js');
    const appSource = path.join(__dirname, '../../../generators/root/templates/App.js');
    let rootReducerPath = '';
    let appPath = '';

    /**
     * Return a newly generated reducer with given name
     * @param {String} name
     * @param {Function} callback
     */
    function createGeneratedReducer(name, callback) {
      helpers.run(generatorReducer)
        .inTmpDir(function(tmpDir) {
          rootReducerPath = path.join(tmpDir, 'src/reducers/index.js');
          fs.copySync(reducerSource, rootReducerPath);

          appPath = path.join(tmpDir, 'src/containers/App.js');
          fs.copySync(appSource, appPath);
        })
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

    it('should add the reducer to the root reducer', (done) => {

      createGeneratedReducer('test', () => {
        assert.fileContent(rootReducerPath, 'test: require(\'./test.js\')');
        done();
      });
    });

    it('should add the reducer to App.js', (done) => {

      createGeneratedReducer('test', () => {
        assert.fileContent(appPath, 'test: state.test');
        done();
      });
    });
  });
});
