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
    this.option('serviceName', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The name of the service to be deployed'
    });
    this.option('serviceDomain', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The domain of the service to be deployed'
    });
    this.option('serviceVersion', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The version of the service to be deployed'
    });
    this.option('name', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The deployment name'
    });
    this.options.destination = this.options.destination || './'

    // Those options are only used when this generator is called from another
    // (for example, a project generator).
    this.options.roles = this.options.roles || []
    this.options.parameters = this.options.parameters || []
    this.options.resources = this.options.resources || []

    // Initializes the answers structure. This structure stores all the
    // responses needed to run the generator. If there is any missing answer,
    // the user will be prompted. The information needed is:
    // * The new deployment name.
    // * The URN of the service to be deployed.
    // * The deployment roles arrangement.
    // * The service parameters values.
    // * The resources assigned.
    this.answers = {}
    let expectedAnswers = ['serviceName','serviceDomain', 'serviceVersion', 'name','roles', 'parameters','resources']
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
      name: 'serviceName',
      message: 'Name of the service to be deployed'
    },{
      type: 'input',
      name: 'serviceDomain',
      message: 'Domain of the service to be deployed'
    },{
      type: 'input',
      name: 'serviceVersion',
      message: 'Version of the service to be deployed'
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
