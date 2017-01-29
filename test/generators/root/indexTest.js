const path = require('path');
const assert = require('yeoman-assert'); // eslint-disable-line
const helpers = require('yeoman-test'); // eslint-disable-line

describe('react-webpack-redux:root', () => {
  const generatorDispatcher = path.join(__dirname, '../../../generators/root');

  /**
   * Return a newly generated dispatcher with given name
   * @param {String} name
   * @param {Function} callback
   */
  function createGeneratedDispatcher(name, callback) {
    helpers.run(generatorDispatcher)
      .withArguments([name])
      .on('end', callback);
  }

  it('should create the root reducer, redux store, base container and custom client.js', (done) => {
    createGeneratedDispatcher('Dispatcher', () => {
      assert.file([
        '.eslintrc',
        'src/client.js',
        'src/stores/index.js',
        'src/reducers/index.js',
        'src/containers/App.js',
        'src/actions/const.js',
        'src/actions/index.js'
      ]);

      done();
    });
  });

});
