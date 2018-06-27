const vm = require('vm');
const fs = require('fs');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // Options supported by this generator:
    // * name: the deployment name. If not set, the user will be prompted.
    // * service: the URN of the service to be deployed. If not set, the user
    //   will be prompted.
    // * destination: the generated code destination folder. Set to the current
    //   folder by default.
    this.option('domain', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The domain for this inbound'
    });
    this.option('name', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The deployment name'
    });
    this.options.destination = this.options.destination || './'

    // Initializes the answers structure. This structure stores all the
    // responses needed to run the generator. If there is any missing answer,
    // the user will be prompted. The information needed is:
    // * The new deployment name.
    // * The URN of the service to be deployed.
    // * The deployment roles arrangement.
    // * The service parameters values.
    // * The resources assigned.
    this.answers = {}
    let expectedAnswers = ['domain','name']
    for (let expected of expectedAnswers) {
      if (this.options[expected]) {
        this.answers[expected] = this.options[expected]
      }
    }
  }

  prompting() {
    // Prompts the user for the deployment name and service unless they have been
    // set as an option
    let allPrompts = [{
      type: 'input',
      name: 'domain',
      message: 'Domain used in this inbound'
    },{
      type: 'input',
      name: 'name',
      message: 'Deployment name'
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
