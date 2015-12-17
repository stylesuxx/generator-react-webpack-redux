'use strict';
let path = require('path');
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test;

describe('react-webpack-redux:action', () => {
  let generatorAction = path.join(__dirname, '../../../generators/action');

  /**
   * Return a newly generated action with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedAction(name, callback) {
    helpers.run(generatorAction)
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
        assert.fileContent('src/actions/getItem.js', 'export default getItem;');
        done();
      });
    });

    it('should append the action to the constants', (done) => {
      createGeneratedAction('getItem', () => {
        assert.fileContent('src/constants/ActionTypes.js', 'export const GET_ITEM = \'GET_ITEM\';');
        done();
      });
    });
  });
});
