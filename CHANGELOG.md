## [1.1.10](https://github.com/kumori-systems/generator-workspace/compare/v1.1.9...v1.1.10) (2019-02-26)


### Bug Fixes

* **helloworld2-fe:** now image files are removed in this component only when the image has been provided by the user ([4e4ca5b](https://github.com/kumori-systems/generator-workspace/commit/4e4ca5b))

## [1.1.9](https://github.com/kumori-systems/generator-workspace/compare/v1.1.8...v1.1.9) (2019-02-15)


### Bug Fixes

* **helloworldv2:** improved the restapi to remove processed images after converting them to ascii ([915f741](https://github.com/kumori-systems/generator-workspace/commit/915f741))

## [1.1.8](https://github.com/kumori-systems/generator-workspace/compare/v1.1.7...v1.1.8) (2019-02-06)


### Bug Fixes

* **reconfig:** bug fixed. The parameters defined for the 'reconfig' method were not correct ([84e314b](https://github.com/kumori-systems/generator-workspace/commit/84e314b))

## [1.1.7](https://github.com/kumori-systems/generator-workspace/compare/v1.1.6...v1.1.7) (2018-10-31)


### Bug Fixes

* **java-web:** added a java web sample service. This service deploys a java web application as a service ([d45bd03](https://github.com/kumori-systems/generator-workspace/commit/d45bd03))

## [1.1.6](https://github.com/kumori-systems/generator-workspace/compare/v1.1.5...v1.1.6) (2018-10-31)


### Bug Fixes

* **component-java:** avoiding occasional error when Taskr copy directories ([591f8c6](https://github.com/kumori-systems/generator-workspace/commit/591f8c6))

## [1.1.5](https://github.com/kumori-systems/generator-workspace/compare/v1.1.4...v1.1.5) (2018-10-31)


### Bug Fixes

* **component-java:** avoiding occasional error when Taskr copy directories ([e0e40cc](https://github.com/kumori-systems/generator-workspace/commit/e0e40cc))
* **component-java:** removed unused file jest.config.js ([b2daa9b](https://github.com/kumori-systems/generator-workspace/commit/b2daa9b))

## [1.1.4](https://github.com/kumori-systems/generator-workspace/compare/v1.1.3...v1.1.4) (2018-10-31)


### Bug Fixes

* **component-hello-world-v3:** removed unused files ([deca500](https://github.com/kumori-systems/generator-workspace/commit/deca500))

## [1.1.3](https://github.com/kumori-systems/generator-workspace/compare/v1.1.2...v1.1.3) (2018-10-30)


### Bug Fixes

* **java:** added some sample for java services. The sample includes a java component generator, a java sample service generator and a java deployment generator ([1657a8a](https://github.com/kumori-systems/generator-workspace/commit/1657a8a))

## [1.1.2](https://github.com/kumori-systems/generator-workspace/compare/v1.1.1...v1.1.2) (2018-09-17)


### Bug Fixes

* **dependency:** bug fix in component-typescript generator template. BaseComponent class was not being imported in index.ts ([42be327](https://github.com/kumori-systems/generator-workspace/commit/42be327))
* **taskfile:** removed a silly 'ls -la' in 'installer' task ([da8fe08](https://github.com/kumori-systems/generator-workspace/commit/da8fe08))

## [1.1.1](https://github.com/kumori-systems/generator-workspace/compare/v1.1.0...v1.1.1) (2018-09-12)


### Bug Fixes

* **runtime-basic:** now the manifest template declares by default a dependency with eslap://eslap.cloud/runtime-agent/2_0_0 ([27c3b76](https://github.com/kumori-systems/generator-workspace/commit/27c3b76))

# [1.1.0](https://github.com/kumori-systems/generator-workspace/compare/v1.0.9...v1.1.0) (2018-09-11)


### Bug Fixes

* **javascript:** taskrfile improved. Templates structure changed. Now the code is in 'lib' folder. ([a0075ff](https://github.com/kumori-systems/generator-workspace/commit/a0075ff))


### Features

* **component-typescript:** new generator for components authored in typescript ([ae8dbf9](https://github.com/kumori-systems/generator-workspace/commit/ae8dbf9))

## [1.0.9](https://github.com/kumori-systems/generator-workspace/compare/v1.0.8...v1.0.9) (2018-07-31)


### Bug Fixes

* **generators:** changed gitlab dependencies to npm packages ([40a5d0d](https://github.com/kumori-systems/generator-workspace/commit/40a5d0d))

## [1.0.8](https://github.com/kumori-systems/generator-workspace/compare/v1.0.7...v1.0.8) (2018-07-18)


### Bug Fixes

* **workspace:** removed test folder since is not being currently used ([117be09](https://github.com/kumori-systems/generator-workspace/commit/117be09))

## [1.0.7](https://github.com/kumori-systems/generator-workspace/compare/v1.0.6...v1.0.7) (2018-07-16)


### Bug Fixes

* **package:** added new keywords ([2fff760](https://github.com/kumori-systems/generator-workspace/commit/2fff760))

## [1.0.6](https://github.com/kumori-systems/generator-workspace/compare/v1.0.5...v1.0.6) (2018-07-16)


### Bug Fixes

* **package:** added a new semantic release plugin ([913c3cb](https://github.com/kumori-systems/generator-workspace/commit/913c3cb))

## [1.0.5](https://github.com/kumori-systems/generator-workspace/compare/v1.0.4...v1.0.5) (2018-07-13)


### Bug Fixes

* **changelog:** removed fake fixes in changelog ([bc5add2](https://github.com/kumori-systems/generator-workspace/commit/bc5add2))

## [1.0.4](https://github.com/kumori-systems/generator-workspace/compare/v1.0.3...v1.0.4) (2018-07-13)


### Bug Fixes

* **generators:** corrected the taskrfile.js to propperly generate the distributable bundle event if a previous version already exists ([f6cb6e3](https://github.com/kumori-systems/generator-workspace/commit/f6cb6e3))

## v1.0.3

Set `baco` as default stamp in workspace generator.
Changed `project-hello-world` generator to include a deployment manifest.
Changed `project-hello-world-v2` generator to include a deployment manifest.
Minor changes to hello world v2 elements.

## v1.0.2

Minor and decorative changes to some components code.
Removed a duplicated `_send` method in `component-hello-world-v2-fe/templates/src/restapi.js` generator.
Removed deprecated `.kumori` folder in generators templates.
Changed the static webpage in hello-world component.
Changed the hello world v2 project to another one more usable.

## v1.0.1

Changed the default templates used in kumoriConfig.json. The old ones were wrong.
