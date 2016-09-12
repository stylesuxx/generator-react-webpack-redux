'use strict';
const generator = require('yeoman-generator');
const path = require('path');
const walk = require('esprima-walk');
const utils = require('../app/utils');

module.exports = generator.Base.extend({
  constructor: function constructor() {
    generator.Base.apply(this, arguments); // eslint-disable-line prefer-rest-params
    this.argument('name', { type: String, required: true });

    this.attachToRoot = function attachToRoot(filePath, relativePath, name) {
      const importDeclaration = {
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportDefaultSpecifier',
          id: { type: 'Identifier', name, range: [] },
          range: []
        }],
        source: { type: 'Literal', value: relativePath },
        importKind: 'value',
        range: []
      };

      const reducerNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name },
        value: { type: 'Identifier', name },
        shorthand: true
      };

      const tree = utils.read(filePath);
      let position = 0;

      walk(tree, (node) => {
        if (node.type === 'Program') {
          for (const item of node.body) {
            position += 1;
            if (item.type !== 'ImportSpecifier' || item.type !== 'ImportDeclaration') {
              break;
            }
          }
        }

        if (node.type === 'VariableDeclarator' && node.id.name === 'reducers') {
          node.init.properties.push(reducerNode);
        }
      });

      (tree.body).splice(position, 0, importDeclaration);

      utils.write(filePath, tree);
    };

    this.attachToApp = function attachToApp(filePath, name) {
      const stateNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name },
        value: {
          type: 'MemberExpression',
          object: { type: 'Identifier', name: 'state' },
          property: { type: 'Identifier', name }
        }
      };

      const tree = utils.read(filePath);
      walk(tree, (node) => {
        // Map reducer to state props
        if (node.type === 'VariableDeclarator' && node.id.name === 'props') {
          node.init.properties.push(stateNode);
        }

        // Add state to main container
        if (node.type === 'MethodDefinition' && node.key.name === 'render') {
          const diff = {
            value: {
              type: 'Identifier',
              name
            },
            shorthand: true
          };

          const propNode = Object.assign({}, stateNode, diff);
          node.value.body.body[0].declarations[0].id.properties.push(propNode);
        }

        if (node.type === 'MethodDefinition' && node.key.name === 'render') {
          const attribute = {
            type: 'JSXAttribute',
            name: { type: 'JSXIdentifier', name },
            value: {
              type: 'JSXExpressionContainer',
              expression: { type: 'Identifier', name }
            }
          };

          node.value.body.body[1].argument.openingElement.attributes.push(attribute);
        }

        // Make the reducers state required
        if (node.type === 'AssignmentExpression' && node.left.object.name === 'App') {
          const diff = {
            value: {
              type: 'MemberExpression',
              object: { type: 'Identifier', name: 'PropTypes' },
              property: { type: 'Identifier', name: 'object.isRequired' }
            }
          };

          const propNode = Object.assign({}, stateNode, diff);
          node.right.properties.push(propNode);
        }
      });

      utils.write(filePath, tree);
    };
  },

  writing: function writing() {
    const appPath = this.destinationPath('src/containers/App.js');
    const rootReducerPath = this.destinationPath('src/reducers/index.js');
    const destination = utils.getDestinationPath(this.name, 'reducers', 'js');
    const baseName = utils.getBaseName(this.name);
    const testName = [baseName, 'Test.js'].join('');
    const testDestinationPath = path.join('test', 'reducers', testName);
    const relativePath = utils.getRelativePath(this.name, 'reducers', 'js');

    // Copy the reducer template
    this.fs.copy(
      this.templatePath('reducer.js'),
      this.destinationPath(destination)
    );

    // Copy the reducers unit test
    this.fs.copyTpl(
      this.templatePath('Test.js.jade'),
      this.destinationPath(testDestinationPath),
      { reducerName: baseName }
    );

    // Add the reducer to the root reducer
    this.attachToRoot(rootReducerPath, relativePath, baseName);

    // Add the reducer to App.js
    this.attachToApp(appPath, baseName);
  }
});
