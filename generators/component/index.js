'use strict';
let generator = require('yeoman-generator');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });
  },

  writing: function() {

    // Build options
    let opts = {};

    if(this.options.stateless === true) {
      opts.stateless = true;
    }

    this.composeWith('react-webpack', {
      options: opts,
      args: [ this.name ]
    }, {
      local: require.resolve('generator-react-webpack/generators/component')
    });
  }
});
