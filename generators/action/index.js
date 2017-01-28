'use strict';
const Generator = require('yeoman-generator');
const walk = require('esprima-walk');
const utils = require('../app/utils');

class ActionGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });

    this.exportAction = function exportAction(filePath, actionPath, name) {
      const importDeclaration = {
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportDefaultSpecifier',
          id: { type: 'Identifier', name, range: [] },
          range: []
        }],
        source: { type: 'Literal', value: actionPath },
        importKind: 'value',
        range: []
      };

      const actionNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name },
        value: { type: 'Identifier', name },
        shorthand: true
      };

      const tree = utils.read(filePath);
      walk(tree, (node) => {
        if (node.type === 'VariableDeclarator' && node.id.name === 'actions') {
          node.init.properties.push(actionNode);
        }
      });

      tree.body.unshift(importDeclaration);

      utils.write(filePath, tree);
    };

    this.attachToApp = function attachToApp(filePath, name) {
      const actionNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name },
        value: { type: 'Identifier', name },
        shorthand: true
      };

      const importNode = {
        type: 'ImportSpecifier',
        id: { type: 'Identifier', name }
      };

      const propDeclaration = {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: name
        },
        value: {
          type: 'MemberExpression',
          object: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'PropTypes'
            },
            property: {
              type: 'Identifier',
              name: 'func'
            },
          },
          property: {
            type: 'Identifier',
            name: 'isRequired',
          }
        }
      };

      const tree = utils.read(filePath);
      walk(tree, (node) => {
        if (node.type === 'VariableDeclarator' && node.id.name === 'actions') {
          node.init.properties.push(actionNode);
        }

        if (node.type === 'AssignmentExpression' &&
            node.left.object.name === 'App') {
          node.right.properties[0].value.arguments[0].properties.push(propDeclaration);
        }

        if (node.type === 'ImportDeclaration' && node.source.value === '../actions/') {
          node.specifiers.push(importNode);
        }
      });

      utils.write(filePath, tree);
    };

    this.attachToConstants = function attachToConstants(filePath, name) {
      const constantNode = {
        type: 'ExportDeclaration',
        declaration: {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: { type: 'Identifier', name },
              init: { type: 'Literal', value: name }
            }
          ]
        }
      };

      const tree = utils.read(filePath);
      walk(tree, (node) => {
        if (node.type === 'Program') {
          node.body.push(constantNode);
        }
      });

      utils.write(filePath, tree);
    };
  }

  writing() {
    const appPath = this.destinationPath('src/containers/App.js');
    const destination = utils.getDestinationPath(this.options.name, 'actions', 'js');
    const constPath = this.destinationPath('src/actions/const.js');
    const indexPath = this.destinationPath('src/actions/index.js');
    const baseName = utils.getBaseName(this.options.name);
    const constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    const relativePath = utils.getRelativePath(this.options.name, 'actions', 'js');
    const depth = this.options.name.split('/').length - 1;
    const importPath = ['../'.repeat(depth), 'const'].join('');

    // Copy action template
    this.fs.copyTpl(
      this.templatePath('Action.js.jade'),
      this.destinationPath(destination),
      {
        actionConstant: constantName,
        importPath
      }
    );

    // Add action to actions/const.js
    this.attachToConstants(constPath, constantName);

    // Export action from actions/index.js
    this.exportAction(indexPath, relativePath, baseName);

    // Add action to App.js
    this.attachToApp(appPath, baseName);
  }
};

module.exports = ActionGenerator;
