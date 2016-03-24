'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');
let fs = require('fs-extra');

describe('react-webpack-redux:action', () => {
  const appSource = path.join(__dirname, '../../../generators/root/templates/App.js');
  const generatorAction = path.join(__dirname, '../../../generators/action');
  const constSource = path.join(__dirname, '../../../generators/root/templates/const.js');
  let appPath = '';
  let constPath = '';

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

        constPath = path.join(tmpDir, 'src/actions/const.js');
        fs.copySync(constSource, constPath);
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

    it('should import the action const', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/getItem.js', "import GET_ITEM from './const'");
        done();
      });
    })

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

    it('should add the action to App.js', (done) => {
      createGeneratedAction('items/getItems', () => {
        assert.fileContent(appPath, '/* Populated by react-webpack-redux:action */');
        assert.fileContent(appPath, 'getItems: require(\'../actions/items/getItems.js\')');
        done();
      });
    });
  });
});
