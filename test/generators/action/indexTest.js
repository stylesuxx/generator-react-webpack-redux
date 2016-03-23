'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');
let fs = require('fs-extra');

describe('react-webpack-redux:action', () => {
  const appSource = path.join(__dirname, '../../../generators/root/templates/App.js');
  const generatorAction = path.join(__dirname, '../../../generators/action');
  let appPath = ''

  /**
   * Return a newly generated action with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedAction(name, callback) {

    // Changed - create an array if name is a string
    name = typeof name === 'string' ? [name] : name

    helpers.run(generatorAction)
      .inTmpDir(function(tmpDir) {
        appPath = path.join(tmpDir, 'src/containers/App.js');
        fs.copySync(appSource, appPath);
      })
      .withArguments(name) // Changed from [name] to name
      .on('end', callback);
  }

  describe('When creating a new action', () => {

    it('should create the action && const file', (done) => {
      createGeneratedAction('getItem', () => {
        assert.file(['src/actions/getItem.js', 'src/actions/const.js']);
        done();
      });
    });

    it('should export the action', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/const.js', "export const GET_ITEM = 'GET_ITEM'");
        assert.fileContent('src/actions/getItem.js', "import GET_ITEM from './const'");
        assert.fileContent('src/actions/getItem.js', 'type: GET_ITEM');
        done();
      });
    });

    it('should have two actions in const file', (done) => {
      // Here I pass an array of namespaced actions
      createGeneratedAction(['items/getItem', 'items/getAnotherItem'], () => {
        assert.file(['src/actions/items/getItem.js', 'src/actions/items/getAnotherItem.js']);
        assert.fileContent('src/actions/items/const.js', "export const GET_ITEM = 'GET_ITEM'");
        assert.fileContent('src/actions/items/const.js', "export const GET_ANOTHER_ITEM = 'GET_ANOTHER_ITEM'");
        done();
      });
    });

    it('should add the action to App.js', (done) => {
      createGeneratedAction('items/getItems', () => {
        assert.fileContent(appPath, '/* Populated by react-webpack-redux:action */');
        assert.fileContent(appPath, 'getItems: require(\'../actions/items/getItems.js\')');
        done();
      });
    });
  });
});
