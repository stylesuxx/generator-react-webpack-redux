'use strict';
let generator = require('yeoman-generator');
let walk = require('esprima-walk');
let utils = require('../app/utils');
let ejs = require('ejs');

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

    // Copy action template
    this.fs.copyTpl(
      this.templatePath('Action.js'),
      this.destinationPath(actionDestination),
      { actionConstant: constantName }
    );


    // Add action to const.js file
    if(this.fs.exists(this.destinationPath(constDestination))){
      // File exists so we keep existing constants
      let constTemplate = this.fs.read(this.templatePath('Constant.js'));
      let newConst = '\n'+ ejs.render(constTemplate, { actionConstant: constantName});
      utils.append(constDestination, newConst);

    }else{
      // File does not exists -> we create a new one
      this.fs.copyTpl(
        this.templatePath('Constant.js'),
        this.destinationPath(constDestination),
        { actionConstant: constantName}
      );
    }


    // Add action to App.js
    this.attachToApp(appPath, relativeActionPath, baseName);
  }
});
