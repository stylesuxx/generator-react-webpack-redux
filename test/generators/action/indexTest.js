'use strict';
const path = require('path');
const assert = require('yeoman-assert'); // eslint-disable-line
const helpers = require('yeoman-test'); // eslint-disable-line
const fs = require('fs-extra'); // eslint-disable-line

describe('react-webpack-redux:action', () => {
  const appSource = path.join(__dirname, '../../../generators/root/templates/App.js');
  const generatorAction = path.join(__dirname, '../../../generators/action');
  const constSource = path.join(__dirname, '../../../generators/root/templates/action/const.js');
  const indexSource = path.join(__dirname, '../../../generators/root/templates/action/index.js');
  let appPath = '';
  let constPath = '';
  let indexPath = '';

  /**
   * Return a newly generated action with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedAction(...args) {
    runGeneratorWithTmpDir(...args, (tmpDir) => {
      copyAppContainer(tmpDir)
      copyConst(tmpDir)
      copyIndex(tmpDir)
    })
  }

  function createGeneratedActionWithoutAppContainer(...args){
    runGeneratorWithTmpDir(...args, (tmpDir) => {
      copyConst(tmpDir)
      copyIndex(tmpDir)
    })
  }

  function runGeneratorWithTmpDir(name, callback, tmpDirFn) {
    helpers.run(generatorAction)
      .inTmpDir(tmpDirFn)
      .withArguments([name])
      .on('end', callback);
  }

  function copyAppContainer(tmpDir) {
    appPath = path.join(tmpDir, 'src/containers/App.js');
    fs.copySync(appSource, appPath);
  }

  function copyConst(tmpDir) {
    constPath = path.join(tmpDir, 'src/actions/const.js');
    fs.copySync(constSource, constPath);
  }

  function copyIndex(tmpDir) {
    indexPath = path.join(tmpDir, 'src/actions/index.js');
    fs.copySync(indexSource, indexPath);
  }

  describe('When creating a new action', () => {

    it('should create the action file', (done) => {
      createGeneratedAction('getItem', () => {
        assert.file(['src/actions/getItem.js']);
        done();
      });
    });

    it('should import the action const', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/getItem.js', 'import { GET_ITEM } from \'./const\'');
        done();
      });
    });

    it('should export the action', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/getItem.js', 'type: GET_ITEM');
        done();
      });
    });

    it('should append the action const export to const.js', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/const.js', 'export const GET_ITEM = \'GET_ITEM\'');
        done();
      });
    });

    it('should export the action from action/index.js', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/index.js',
          'import getItem from \'../actions/getItem.js\';');

        assert.fileContent('src/actions/index.js',
          'const actions = { getItem };');

        done();
      });
    });

    context('with App.js', () => {
      it('should add the action to App.js', (done) => {
        createGeneratedAction('getItems', () => {
          assert.fileContent(appPath, 'import { getItems } from \'../actions/\'');
          assert.fileContent(appPath, 'const actions = { getItems };');
          assert.fileContent(appPath, 'getItems: PropTypes.func.isRequired');
          done();
        });
      });
    });

    context('without App.js', () => {
      it('should not add the action to App.js', (done) => {

        createGeneratedActionWithoutAppContainer('test', () => {
          done();
        });
      });
    });
  });

  describe('When creating a new name spaced action', () => {

    it('should create the action file', (done) => {
      createGeneratedAction('name/space/getItem', () => {
        assert.file(['src/actions/name/space/getItem.js']);
        done();
      });
    });

    it('should import the action const', (done) => {
      createGeneratedAction('name/space/getItem', () => {
        assert.fileContent('src/actions/name/space/getItem.js',
          'import { GET_ITEM } from \'./../../const\'');

        done();
      });
    });

    it('should export the action', (done) => {
      createGeneratedAction('name/space/getItem', () => {
        assert.fileContent('src/actions/name/space/getItem.js', 'type: GET_ITEM');
        done();
      });
    });

    it('should append the action const export to const.js', (done) => {
      createGeneratedAction('name/space/getItem', () => {
        assert.fileContent('src/actions/const.js', 'export const GET_ITEM = \'GET_ITEM\'');
        done();
      });
    });

    it('should export the action from action/index.js', (done) => {
      createGeneratedAction('name/space/getItem', () => {
        assert.fileContent('src/actions/index.js',
          'import getItem from \'../actions/name/space/getItem.js\';');

        assert.fileContent('src/actions/index.js',
          'const actions = { getItem };');

        done();
      });
    });

    context('with App.js', () => {
      it('should add the action to App.js', (done) => {

        createGeneratedAction('name/space/getItems', () => {
          assert.fileContent(appPath, 'import { getItems } from \'../actions/\'');
          assert.fileContent(appPath, 'const actions = { getItems };');
          done();
        });
      });
    });

    context('without App.js', () => {
      it('should not add the reducer to App.js', (done) => {

        createGeneratedActionWithoutAppContainer('test', () => {
          done();
        });
      });
    });

  });
});
