const vm = require('vm');
const fs = require('fs');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    // Options supported by this generator:
    // * name: the runtime name. If not set, the user will be prompted.
    // * domain: the runtime domain. If not set, the user will be prompted.
    // * parent: the parent runtime.
    // * from: the docker image containing the parent runtime.
    // * componentFolder: the folder inside the container where the component code will be placed.
    // * entrypoint: the runtime entrypoint.
    // * destination: the generated code destination folder. Set to the current
    //   folder by default.
    this.option('name', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The runtime name'
    });
    this.option('domain', {
      type: String,
      required: false,
      defaults: undefined,
      desc: 'The runtime domain'
    });
    this.option('parent', {
      type: String,
      required: false,
      defaults: "eslap://eslap.cloud/runtime/native/2_0_0",
      desc: 'The parent runtime'
    });
    this.option('from', {
      type: String,
      required: false,
      defaults: "eslap.cloud/runtime/native:2_0_0",
      desc: 'The base docker image used in the Dockerfile'
    });
    this.option('componentFolder', {
      type: String,
      required: false,
      defaults: "/eslap/component",
      desc: 'The folder where the component code will be places inside the docker container'
    });
    this.option('entrypoint', {
      type: String,
      required: false,
      defaults: "/eslap/runtime-agent/scripts/start-runtime-agent.sh",
      desc: 'The docker image entrypoint'
    });
    this.options.destination = this.options.destination || './'

    // Initializes the answers structure. This structure stores all the
    // responses needed to run the generator. If there is any missing answer,
    // the user will be prompted.
    this.answers = {}
    if (this.options.name) {
      this.answers.name = this.options.name
    }
    if (this.options.domain) {
      this.answers.domain = this.options.domain
    }
    this.answers = {}
    let expectedAnswers = ['name','domain', 'parent','from','componentFolder','entrypoint']
    for (let expected of expectedAnswers) {
      if (this.options[expected]) {
        this.answers[expected] = this.options[expected]
      }
    }
  }

  prompting() {
    // Prompts the user for the component name and domain unless they have been
    // set as an option
    let allPrompts = [{
      type: 'input',
      name: 'domain',
      message: 'Service domain'
    },{
      type: 'input',
      name: 'name',
      message: 'name'
    },{
      type: 'input',
      name: 'parent',
      message: 'Parent runtime URN'
    },{
      type: 'input',
      name: 'from',
      message: 'Parent runtime Docker image'
    },{
      type: 'input',
      name: 'componentFolder',
      message: 'Folder where the component code will be deployed'
    },{
      type: 'input',
      name: 'entrypoint',
      message: 'Runtime entrypoint'
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
