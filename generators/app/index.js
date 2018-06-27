const vm = require('vm');
const fs = require('fs');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath('./'),
    )
  }
};
