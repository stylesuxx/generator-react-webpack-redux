'use strict';
let generator = require('yeoman-generator');
let path = require('path');
let walk = require('esprima-walk');
let astHelpers = require('../app/astHelpers');

module.exports = generator.NamedBase.extend({
  constructor: function() {
    generator.NamedBase.apply(this, arguments);

    this.attachToRoot = function(path, name) {
      const reducerPath = ['./', name, '.js'].join('');
      const reducerNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name: name },
        value: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: 'require' },
          arguments: [ { type: 'Literal', value: reducerPath } ]
        }
      };

      let tree = astHelpers.read(path);
      walk(tree, function(node) {
        if(node.type === 'VariableDeclarator' && node.id.name === 'reducers') {
          node.init.properties.push(reducerNode);
        }
      });

      astHelpers.write(path, tree);
    };

    this.attachToApp = function(path, name) {
      const stateNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name: name },
        value: {
          type: 'MemberExpression',
          object: { type: 'Identifier', name: 'state' },
          property: { type: 'Identifier', name: name }
        }
      };

      let tree = astHelpers.read(path);
      walk(tree, function(node) {
        // Map reducer to state props
        if(node.type === 'VariableDeclarator' && node.id.name === 'props') {
          node.init.properties.push(stateNode);
        }

        // Add state to main container
        if(node.type === 'MethodDefinition' && node.key.name === 'render') {
          const diff = {
            value: {
              type: 'Identifier',
              name: name,
              typeAnnotation: undefined,
              optional: undefined
            },
            shorthand: true
          }
          const propNode = Object.assign({}, stateNode, diff);
          node.value.body.body[0].declarations[0].id.properties.push(propNode);
        }

        if(node.type === 'MethodDefinition' && node.key.name === 'render') {
          const attribute = {
            type: 'JSXAttribute',
            name: { type: 'JSXIdentifier', name: name},
            value: {
              type: 'JSXExpressionContainer',
              expression: {
                type: 'Identifier',
                name: name
              }
            }
          }
          node.value.body.body[1].argument.openingElement.attributes.push(attribute);
        }

        // Make the reducers state required
        if(node.type === 'AssignmentExpression' && node.left.object.name === 'App') {
          const diff = {
            value: {
              type: 'MemberExpression',
              object: { type: 'Identifier', name: 'PropTypes' },
              property: { type: 'Identifier', name: 'object.isRequired' }
            }
          }
          const propNode = Object.assign({}, stateNode, diff);
          node.right.properties.push(propNode);
        }
      });

      astHelpers.write(path, tree);
    };
  },

  writing: function() {
    let baseName = this.name;
    let destinationPath = path.join('src', 'reducers', baseName + '.js');
    let rootReducerPath = this.destinationPath(path.join('src', 'reducers', 'index.js'));
    let appPath = this.destinationPath(path.join('src', 'containers', 'App.js'));
    let testDestinationPath = path.join('test', 'reducers', baseName + 'Test.js');

    // Copy the reducer template
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(destinationPath),
      { reducerName: baseName }
    );

    // Copy the reducers unit test
    this.fs.copyTpl(
      this.templatePath('Test.js'),
      this.destinationPath(testDestinationPath),
      { reducerName: baseName }
    );

    // Add the reducer to the root reducer
    this.attachToRoot(rootReducerPath, baseName);

    // Add the reducer to App.js
    this.attachToApp(appPath, baseName);
  }
});
