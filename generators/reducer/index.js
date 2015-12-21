'use strict';
let generator = require('yeoman-generator');
let path = require('path');
let walk = require('esprima-walk');
let utils = require('../app/utils');

module.exports = generator.Base.extend({
  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });

    this.attachToRoot = function(path, relativePath, name) {
      const reducerNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name: name },
        value: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: 'require' },
          arguments: [ { type: 'Literal', value: relativePath } ]
        }
      };

      let tree = utils.read(path);
      walk(tree, function(node) {
        if(node.type === 'VariableDeclarator' && node.id.name === 'reducers') {
          node.init.properties.push(reducerNode);
        }
      });

      utils.write(path, tree);
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

      let tree = utils.read(path);
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

      utils.write(path, tree);
    };
  },

  writing: function() {
    const appPath = this.destinationPath('src/containers/App.js');
    const rootReducerPath = this.destinationPath('src/reducers/index.js');
    const destination = utils.getDestinationPath(this.name, 'reducers', 'js');
    const baseName = utils.getBaseName(this.name);
    const testDestinationPath = path.join('test', 'reducers', baseName + 'Test.js');
    const relativePath = utils.getRelativePath(this.name, 'reducers', 'js');

    // Copy the reducer template
    this.fs.copy(
      this.templatePath('reducer.js'),
      this.destinationPath(destination)
    );

    // Copy the reducers unit test
    this.fs.copyTpl(
      this.templatePath('Test.js'),
      this.destinationPath(testDestinationPath),
      { reducerName: baseName }
    );

    // Add the reducer to the root reducer
    this.attachToRoot(rootReducerPath, relativePath, baseName);

    // Add the reducer to App.js
    this.attachToApp(appPath, baseName);
  }
});
