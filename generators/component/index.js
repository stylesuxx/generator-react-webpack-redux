'use strict';
const ReactWebpackGenerator = require('generator-react-webpack/generators/component');

class ComponentGenerator extends ReactWebpackGenerator {

  writing() {
    this.composeWith(
      'react-webpack',
      { options: this.options, arguments: this.arguments },
      { local: require.resolve('generator-react-webpack/generators/component') }
    );
  }

};

module.exports = ComponentGenerator;
