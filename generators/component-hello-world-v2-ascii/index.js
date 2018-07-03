const vm = require('vm');
const fs = require('fs');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // Options supported by this generator:
    // * name: the component name. If not set, the user will be prompted.
    // * domain: the company domain. If not set, the user will be prompted.
    // * destination: the generated code destination folder. Set to the current
    //   folder by default.
    this.option('name', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The component name'
    });
    this.option('domain', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The component domain'
    });
    this.options.destination = this.options.destination || './'

    // Initializes the answers structure. This structure stores all the
    // responses needed to run the generator. If there is any missing answer,
    // the user will be prompted. The information needed is:
    // * The new component name.
    // * The company domain.
    this.answers = {}
    if (this.options.name) {
      this.answers.name = this.options.name
    }
    if (this.options.domain) {
      this.answers.domain = this.options.domain
    }
  }

  prompting() {
    // Prompts the user for the component name and domain unless they have been
    // set as an option
    let allPrompts = [{
      type: 'input',
      name: 'name',
      message: 'Component name'
    },{
      type: 'input',
      name: 'domain',
      message: 'Company domain'
    }]
    let finalPrompts = []
    for (let pr of allPrompts) {
      if (!this.answers[pr.name]) {
        finalPrompts.push(pr)
      }
    }
    return this.prompt(finalPrompts).then((answers) => {
      for (let name in answers) {
        this.answers[name] = answers[name]
      }
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(this.options.destination),
      this.answers
    )
  }
};
