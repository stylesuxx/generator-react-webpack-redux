'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

describe('react-webpack-redux:container', () => {
  const generatorContainer = path.join(__dirname, '../../../generators/container');

  /**
   * Return a newly generated action with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedContainer(name, callback) {

    helpers.run(generatorContainer)
      .withArguments([name])
      .on('end', callback);
  }

  describe('When creating a new action', () => {

    it('should create the container file', (done) => {
      createGeneratedContainer('TestContainer', () => {
        assert.file(['src/containers/TestContainer.js']);
        done();
      });
    });

    it('should have the proper class Name', (done) => {
      createGeneratedContainer('TestContainer', () => {
        assert.fileContent('src/containers/TestContainer.js', 'class TestContainer');
        done();
      });
    });

    it('should have the proper prefix', (done) => {
      createGeneratedContainer('TestContainer', () => {
        assert.fileContent('src/containers/TestContainer.js', '../components/Main');
        done();
      });
    });

    it('should have prop types attached', (done) => {
      createGeneratedContainer('TestContainer', () => {
        assert.fileContent('src/containers/TestContainer.js', 'TestContainer.propTypes');
        done();
      });
    });

    it('should export itself', (done) => {
      createGeneratedContainer('TestContainer', () => {
        assert.fileContent('src/containers/TestContainer.js', '(TestContainer);');
        done();
      });
    });
  });

  describe('When creating a new name spaced container', () => {

    it('should create the container file', (done) => {
      createGeneratedContainer('name/space/TestContainer', () => {
        assert.file(['src/containers/name/space/TestContainer.js']);
        done();
      });
    });

    it('should have the proper class Name', (done) => {
      createGeneratedContainer('name/space/TestContainer', () => {
        assert.fileContent('src/containers/name/space/TestContainer.js', 'class TestContainer');
        done();
      });
    });

    it('should have prop types attached', (done) => {
      createGeneratedContainer('name/space/TestContainer', () => {
        assert.fileContent('src/containers/name/space/TestContainer.js', 'TestContainer.propTypes');
        done();
      });
    });

    it('should have the proper prefix', (done) => {
      createGeneratedContainer('name/space/TestContainer', () => {
        assert.fileContent('src/containers/name/space/TestContainer.js', '../../../components/Main');
        done();
      });
    });

    it('should export itself', (done) => {
      createGeneratedContainer('name/space/TestContainer', () => {
        assert.fileContent('src/containers/name/space/TestContainer.js', '(TestContainer);');
        done();
      });
    });
  });
});
