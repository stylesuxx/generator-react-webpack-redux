'use strict';
let generator = require('yeoman-generator');
let walk = require('esprima-walk');
let utils = require('../app/utils');

module.exports = generator.NamedBase.extend({

  constructor: function() {
    generator.NamedBase.apply(this, arguments);

    this.attachToApp = function(appPath, actionPath, name) {
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

      let tree = utils.read(appPath);
      walk(tree, function(node) {
        if(node.type === 'VariableDeclarator' && node.id.name === 'actions') {
          node.init.properties.push(actionNode);
        }
      });

      utils.write(appPath, tree);
    };
  },

  writing: function() {
    const appPath = this.destinationPath('src/containers/App.js');
    const destination = utils.getDestinationPath(this.name, 'actions', 'js');
    const baseName = utils.getBaseName(this.name);
    const constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    const relativePath = utils.getRelativePath(this.name, 'actions', '..', 'js');

    // Copy action template
    this.fs.copyTpl(
      this.templatePath('Action.js'),
      this.destinationPath(destination),
      {
        actionName: baseName,
        actionConstant: constantName
      }
    );

    // Add action to App.js
    this.attachToApp(appPath, relativePath, baseName);
  }
});
