'use strict';
let generator = require('yeoman-generator');
let walk = require('esprima-walk');
let utils = require('../app/utils');

module.exports = generator.Base.extend({

  constructor: function() {
    generator.Base.apply(this, arguments);
    this.argument('name', { type: String, required: true });

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
    const baseName = utils.getBaseName(this.name);
    const namespace = this.name.replace(baseName, '')
    const actionDestination = utils.getDestinationPath(this.name, 'actions', 'js');
    const constDestination = utils.getDestinationPath(namespace+'const', 'actions', 'js');
    const constantName = (baseName.split(/(?=[A-Z])/).join('_')).toUpperCase();
    const relativeActionPath = utils.getRelativePath(this.name, 'actions', 'js');

    // console.log('appPath ---', appPath)
    // console.log('actionDestination ---', actionDestination)
    // console.log('constDestination ---', constDestination)
    // console.log('baseName ---', this.name)
    // console.log('namespace ---', namespace)
    // console.log('constantName ---', constantName)
    // console.log('relativeActionPath ---', relativeActionPath)

    // Copy action template
    this.fs.copyTpl(
      this.templatePath('Action.js'),
      this.destinationPath(actionDestination),
      { actionConstant: constantName }
    );

    // Add action to const file
    let existingConsts = ''
    if(this.fs.exists(this.destinationPath(constDestination))){
      // File exists so we keep existing constants
      existingConsts = '\n' + this.fs.read(constDestination)
    }

    // we recreate file
    this.fs.copyTpl(
      this.templatePath('Constant.js'),
      this.destinationPath(constDestination),
      { actionConstant: constantName}
    );

    // We attach existing constants
    const newConst = this.fs.read(this.destinationPath(constDestination))
    this.fs.write(this.destinationPath(constDestination), newConst + existingConsts)


    // Add action to App.js
    this.attachToApp(appPath, relativeActionPath, baseName);
  }
});
