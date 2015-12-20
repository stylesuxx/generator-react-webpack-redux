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
    helpers.run(generatorAction)
      .inTmpDir(function(tmpDir) {
        appPath = path.join(tmpDir, 'src/containers/App.js');
        fs.copySync(appSource, appPath);
      })
      .withArguments([name])
      .on('end', callback);
  }

  describe('When creating a new action', () => {

    it('should create the action file', (done) => {
      createGeneratedAction('getItem', () => {
        assert.file(['src/actions/getItem.js']);
        done();
      });
    });

    it('should export the action', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/getItem.js', 'module.exports = getItem;');
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
