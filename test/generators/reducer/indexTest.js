const path = require('path');
const assert = require('yeoman-assert');  // eslint-disable-line
const helpers = require('yeoman-test');  // eslint-disable-line
const fs = require('fs-extra');  // eslint-disable-line

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
        .inTmpDir((tmpDir) => {
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

      createGeneratedReducer('namespaced/test', () => {
        assert.fileContent(rootReducerPath, '/* Populated by react-webpack-redux:reducer */');
        assert.fileContent(rootReducerPath, 'import test from \'../reducers/namespaced/test.js\';');
        assert.fileContent(rootReducerPath, 'const reducers = { test };');

        done();
      });
    });

    it('should add the reducer to App.js', (done) => {

      createGeneratedReducer('test', () => {
        assert.fileContent(appPath, '/* Populated by react-webpack-redux:reducer */');
        assert.fileContent(appPath, 'test: state.test');
        assert.fileContent(appPath, 'test: PropTypes.object.isRequired');
        assert.fileContent(appPath, 'const {actions, test} = this.props;');
        assert.fileContent(appPath, '<Main actions={actions} test={test}/>');
        done();
      });
    });
  });
});
