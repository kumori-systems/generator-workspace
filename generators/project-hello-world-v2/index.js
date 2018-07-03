const vm = require('vm');
const fs = require('fs');
const path = require('path');
var Generator = require('yeoman-generator');


// generators/app/templates
// ├── components
// │   └── hello-world
// └── services
//     └── hello-world

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // Options supported by this generator:
    // * name: the project name. If not set, the user will be prompted.
    // * domain: the company domain. If not set, the user will be prompted.
    // * destination: the generated code destination folder. Set to the current
    //   folder by default.
    this.option('name', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The project name'
    });
    this.option('domain', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The company domain'
    });
    this.options.destination = this.options.destination || './'

    // Initializes the answers structure. This structure stores all the
    // responses needed to run the generator. If there is any missing answer,
    // the user will be prompted. The information needed is:
    // * The new project name.
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
    // Prompts the user for the project name and domain unless they have been
    // set as an option
    let allPrompts = [{
      type: 'input',
      name: 'name',
      message: 'Project name'
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

  installComponent() {
    // Ascii converter component
    const asciiOptions = {}
    asciiOptions.name = `${this.answers.name}_ascii`
    asciiOptions.domain= this.answers.domain
    asciiOptions.destination = path.resolve(this.options.destination, 'components', asciiOptions.domain, asciiOptions.name)
    this.composeWith(require.resolve('../component-hello-world-v2-ascii'), asciiOptions)
    // Frontend component
    const frontendOptions = {}
    frontendOptions.name = `${this.answers.name}_fe`
    frontendOptions.domain= this.answers.domain
    frontendOptions.destination = path.resolve(this.options.destination, 'components', frontendOptions.domain, frontendOptions.name)
    this.composeWith(require.resolve('../component-hello-world-v2-fe'), frontendOptions)
    // Service
    const serviceOptions = {}
    serviceOptions.name = this.answers.name
    serviceOptions.domain= this.answers.domain
    serviceOptions.destination = path.resolve(this.options.destination, 'services', this.answers.domain, this.answers.name)
    this.composeWith(require.resolve('../service-hello-world-v2'), serviceOptions)
  }
};
