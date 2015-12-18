'use strict';
let esprima = require('esprima');
let walk = require('esprima-walk');
let escodegen = require('escodegen');
let generator = require('yeoman-generator');
//let utils = require('generator-react-webpack/utils/all');
let path = require('path');
let fs = require('fs');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);
  },

  writing: function() {

    let baseName = this.name;
    let destinationPath = path.join('src', 'reducers', baseName + '.js');
    let rootReducerPath = this.destinationPath(path.join('src', 'reducers', 'index.js'));
    let testDestinationPath = path.join('test', 'reducers', baseName + 'Test.js');

    // Copy the base store
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(destinationPath),
      { reducerName: baseName }
    );

    // Copy the unit test
    this.fs.copyTpl(
      this.templatePath('Test.js'),
      this.destinationPath(testDestinationPath),
      { reducerName: baseName }
    );

    // Add the reducer to the root reducer
    let reducer = 'var reducer = { ' + baseName +': require(\'./' + baseName + '.js\')}';
    reducer = esprima.parse(reducer);
    reducer = reducer.body[0].declarations[0].init.properties[0];

    let data = fs.readFileSync(rootReducerPath, 'utf8');
    let parsed = esprima.parse(data);

    walk.walkAddParent(parsed, function(node) {
      if(node.type === 'VariableDeclarator' && node.id.name === 'reducers') {
        node.init.properties.push(reducer);
      }
    });

    let options = { format: { indent: { style: '  ' } } };
    let code = escodegen.generate(parsed, options);
    fs.writeFileSync(rootReducerPath, code, 'utf8');

    // TODO: Add the reducer to App.js
  }
});
