# Kumori Platform Yeoman Generators

This is a [yeoman](http://yeoman.io) generator for the [Kumori Platform](https://discover.kumori.cloud).

THIS IS A TEST

## Description

The generators included in this module can be directly used from [yeoman](http://yeoman.io) or called as templates from [Kumori CLI](https://github.com/kumori-systems/cli).

## Table of contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

    npm install -g @kumori/generator-workspace

## Usage

The generators included in this module can be directly called using `yo` or installed in a Kumori's workspace using Kumori's CLI `kumori`.

For example, to creare a brand new workspace using `yo`:

    $ yo @kumori/workspace

And using kumori:

    $ kumori init -t @kumori/workspace

Or simply

    $ kumori init

If `init` command uses the `@kumori/workspace` generator by default (see _kumoriConfig.json_ file in your workspace).

As another example, to add a new basic nodejs component to your newly created workspace using yo:

    $ mkdir -p component/kumori.systems/hello
    $ cd component/kumori.systems/hello
    $ yo @kumori/workspace:component-javascript
    ? Component name hello
    ? Company domain kumori.systems
        create package.json
        create Manifest.json
        create README.rst
        create config.json
        create jest.config.js
        create taskfile.js
        create src/index.js
        create test/sample.jest.js

Or, much more simple, you can use the `kumori` CLI:

    $ kumori component add hello -t @kumori/workspace:component-javascript
    Adding component hello in kumori.systems using template @kumori/workspace:component-javascript
        create components/kumori.systems/hello/package.json
        create components/kumori.systems/hello/Manifest.json
        create components/kumori.systems/hello/README.rst
        create components/kumori.systems/hello/config.json
        create components/kumori.systems/hello/jest.config.js
        create components/kumori.systems/hello/taskfile.js
        create components/kumori.systems/hello/src/index.js
        create components/kumori.systems/hello/test/sample.jest.js
    Component eslap://kumori.systems/components/hello/0_0_1 created in ./components/kumori.systems/hello

Or, even more simply

    $ kumori component add hello
    Adding component hello in kumori.systems using template @kumori/workspace:component-javascript
        create components/kumori.systems/hello/package.json
        create components/kumori.systems/hello/Manifest.json
        create components/kumori.systems/hello/README.rst
        create components/kumori.systems/hello/config.json
        create components/kumori.systems/hello/jest.config.js
        create components/kumori.systems/hello/taskfile.js
        create components/kumori.systems/hello/src/index.js
        create components/kumori.systems/hello/test/sample.jest.js
    Component eslap://kumori.systems/components/hello/0_0_1 created in ./components/kumori.systems/hello

If `component add` command uses `@kumori/workspace:component-javascript` by default (see _kumoriConfig.json_ file in your workspace).

This module includes the following generators:

* `@kumori/workspace`: generates an empty workspace with a pre-filled _kumoriConfig.json_ configuration file.
* `@kumori/workspace:component-express`: generates a component with an express application.
* `@kumori/workspace:component-hello-world`: generates a component with a simple hello world application. This component is used in `@kumori/workspace:project-hello-world` generator.
* `@kumori/workspace:component-hello-world-v2-datastorage`: generates a component with a simple in-memory key/value datastorage.
* `@kumori/workspace:component-hello-world-fe`: generates a frontend component to access a datastorage using a REST API.
* `@kumori/workspace:component-javascript`: generates a basic node.js component.
* `@kumori/workspace:deployment-basic`: generates an empty deployment manifest to deploy an instance of a service.
* `@kumori/workspace:project-hello-world`: fills the workspace with all the necessary elements ro register a simple Hello World service. Internally uses `@kumori/workspace:component-hello-world` and `@kumori/workspace:service-hello-world` generators.
* `@kumori/workspace:project-hello-world`: fills the workspace with all the necessary elements ro register a simple Hello World service using a Data Storage. Internally uses `@kumori/workspace:component-hello-world-v2-datastorage`, `@kumori/workspace:component-hello-world-v2-fe` and `@kumori/workspace:service-hello-world-v2` generators.
* `@kumori/workspace:resource-vhost`: generates a declaration manifest to register a new domain.
* `@kumori/workspace:runtime-basic`: generates an empty _Dockerfile_ and manifest to create a new runtime for Kumori components.
* `@kumori/workspace:service-basic`: generates an empty service topology declaration file.
* `@kumori/workspace:service-hello-world`: generates a service topology declaration file for the Hello World sample project.
* `@kumori/workspace:service-hello-world-v2`: generates a service topology declaration file for the Hello World V2 sample project.

## License

MIT © Kumori Systems
