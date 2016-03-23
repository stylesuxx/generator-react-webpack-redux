'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');
let fs = require('fs-extra');

describe('react-webpack-redux:action', () => {
  const appSource = path.join(__dirname, '../../../generators/root/templates/App.js');
  const generatorAction = path.join(__dirname, '../../../generators/action');
  const constSource = path.join(__dirname, '../../../generators/root/templates/const.js');
  let appPath = ''

  /**
   * Return a newly generated action with given name
   * @param {String} name
   * @param {Function} callback
   * @param {Boolean} withConstFile - write a const.js file in actions/my/namespace for overwriting tests
   */
  function createGeneratedAction(name, callback, withConstFile) {

    helpers.run(generatorAction)
      .inTmpDir(function(tmpDir) {
        appPath = path.join(tmpDir, 'src/containers/App.js');
        fs.copySync(appSource, appPath);

        // To test if all constants are kept when creating new actions
        if(withConstFile) {
          let namespace = name.match(/(.*\/)/) || ['']; //Extract the namespace
          let constPath = path.join(tmpDir, 'src/actions/'+ namespace[0] +'const.js');
          fs.copySync(constSource, constPath);
        }
      })
      .withArguments([name])
      .on('end', callback)
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

    it('should export 2 actions (with namespace)', (done) => {
      createGeneratedAction('my/huge/namespace/getItem', () => {
        assert.fileContent('src/actions/my/huge/namespace/const.js', "export const GET_ITEM = 'GET_ITEM'");
        assert.fileContent('src/actions/my/huge/namespace/const.js', "export const A_RANDOM_ACTION = 'A_RANDOM_ACTION'");
        assert.fileContent('src/actions/my/huge/namespace/getItem.js', "import GET_ITEM from './const'");
        assert.fileContent('src/actions/my/huge/namespace/getItem.js', 'type: GET_ITEM');
        done();
      }, true);
    });

    it('should export 2 actions (without namespace)', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/actions/const.js', "export const GET_ITEM = 'GET_ITEM'");
        assert.fileContent('src/actions/const.js', "export const A_RANDOM_ACTION = 'A_RANDOM_ACTION'");
        assert.fileContent('src/actions/getItem.js', "import GET_ITEM from './const'");
        assert.fileContent('src/actions/getItem.js', 'type: GET_ITEM');
        done();
      }, true);
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
