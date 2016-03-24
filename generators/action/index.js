'use strict';
let generator = require('yeoman-generator');
let walk = require('esprima-walk');
let utils = require('../app/utils');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });

    this.attachToApp = function(path, actionPath, name) {
      const actionNode = {
        type: 'Property',
        kind: 'init',
        key: { type: 'Identifier', name: name },
        value: {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: 'require' },
          arguments: [ { type: 'Literal', value: actionPath } ]
        }
      };

      let tree = utils.read(path);
      walk(tree, function(node) {
        if(node.type === 'VariableDeclarator' && node.id.name === 'actions') {
          node.init.properties.push(actionNode);
        }
      });

      utils.write(path, tree);
    };

    this.attachToConstants = function(path, name) {
      const constantNode = {
        type: 'ExportDeclaration',
        declaration: {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: name
              },
              init: {
                type: 'Literal',
                value: name
              }
            }
          ]
        }
      };

      let tree = utils.read(path);
      walk(tree, function(node) {
        if(node.type === 'Program') {
          node.body.push(constantNode);
        }
      });

      utils.write(path, tree);
    };
  },

  writing: function() {
    const appPath = this.destinationPath('src/containers/App.js');
    const destination = utils.getDestinationPath(this.name, 'actions', 'js');
    const constPath = this.destinationPath('src/actions/const.js');
    const baseName = utils.getBaseName(this.name);
    const constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    const relativePath = utils.getRelativePath(this.name, 'actions', 'js');

    // Copy action template
    this.fs.copyTpl(
      this.templatePath('Action.js'),
      this.destinationPath(destination),
      { actionConstant: constantName }
    );

    // Add action to const.js
    this.attachToConstants(constPath, constantName);

    // Add action to App.js
    this.attachToApp(appPath, relativePath, baseName);
  }
});
