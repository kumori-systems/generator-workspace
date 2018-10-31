const vm = require('vm');
const fs = require('fs-extra');
const path = require('path');
const package = getJSON(path.resolve(process.cwd(), 'package.json'))

let name = package.name;
let distPath = path.resolve(process.cwd(), 'dist')
let componentDistPath = path.resolve(distPath,'components', name)
let componentCodeDistPath = path.resolve(componentDistPath, 'code')
let componentSourceDistPath = path.resolve(componentCodeDistPath, 'contents')


// Gobble up a JSON file with comments
function getJSON(filepath) {
  const jsonString = "g = " + fs.readFileSync(filepath, 'utf8') + "; g";
  return (new vm.Script(jsonString)).runInNewContext();
}


function* componentManifest(file) {
  const tom = JSON.parse(file.data.toString('utf8'));
  file.base = path.parse(file.base).name + ".json";
  file.data = new Buffer(JSON.stringify(tom, null, 2));
}


function* codeManifest (file) {
  const manifest = JSON.parse(file.data.toString('utf8'));

  let codeManifest = {
    spec : "http://eslap.cloud/manifest/blob/1_0_0",
    name : manifest.code
  }

  file.base = path.parse(file.base).name + ".json";
  file.data = new Buffer(JSON.stringify(codeManifest, null, 2));
}

function* dockerImage(file) {
  let raw = JSON.parse(file.data.toString('utf8')).runtime.slice(8)
    , comps = raw.split('/')
    , version = comps.pop();

  comps.push('dev')
  file.base = comps.join('/') + ":" + version
  file.dir = ""
}

const tasks = {
  default: function* (task) {
    yield task.serial(['build']);
  }

  , clean: function* (task) {
    yield task.clear(['coverage'])
  }

  , cleandist: function* (task) {
    yield task.clear(['build', 'dist'])
  }

  , superclean: function* (task) {
    yield task.parallel(['clean'])
  }

  , mrproper: function* (task) {
    yield task.parallel(['cleandist', 'superclean']);
  }

  , build: function* (task) {
  }

  , build2dist: function* (task) {
    yield task
      .run({ every: false, files: false }, function * () {
        let src = path.resolve(process.cwd(), 'build')
        let dst = componentSourceDistPath
        return new Promise((resolve, reject) => {
          fs.mkdirp(dst)
          .then(() => { return fs.copy(src, dst) })
          .then(() => { resolve() })
          .catch((err) => { reject(err) })
        })
      })
    // Note: This way is simpler... but sometimes fails!
    // yield task
    //  .source(['build/**/*'])
    //  .target(componentSourceDistPath)
  }

  , dist: function* (task) {
    if (!fs.existsSync('Manifest.json')) {
      return
    }
    // We should distinguish the various cases here

    let name = getJSON('package.json').name;

    yield task.serial(['clean', 'cleandist', 'installer', 'build', 'build2dist'])
      .source(['build/**/*'])
      .target(componentSourceDistPath)
      .source(['Manifest.json'])
      .target(componentDistPath)
      .source(['Manifest.json'])
      .run({ every: true, files: true }, codeManifest)
      .target(componentCodeDistPath)
      .shell(`cd ${distPath} && zip -r bundle.zip components && rm -rf components`)
  }

  , test: function* (task) {
    // TODO
    yield task.serial(['build'])
  }

  , lint: function* (task) {
    // TODO
  }

  , installer: function* (task) {

    let javalib = "/eslap/java-runtime-lib"
    let buildpath = "/tmp/component/build"
    let command = `docker run --rm -t --entrypoint=bash -e JAVALIB="${javalib}" -e BUILDPATH="${buildpath}" -v $PWD:/tmp/component $file -c "cd /tmp/component && ./scripts/compile.sh && chown -R $(id -u):$(id -g) build"`

    yield task.source(path.resolve(process.cwd(), 'component.properties'))
      .target(buildpath)
      .source(path.resolve(process.cwd(), 'Manifest.json'))
      .run({ every: true }, dockerImage)
      .shell(command, {cmd: componentSourceDistPath})
  }

}

function loadPlugin(task, plug) {
  if (isObject(plug)) {
    task.plugin(plug)
  } else {
    plug(task)
  }
}

var isObject =
  val => Boolean(val) && (val.constructor === Object)

function plugin(task, _, utils) {
  // Load common plugins
  loadPlugin(task, require('@task/shell'))
}

plugin.tasks = function () {
  return Object.create(tasks);
}

plugin.internals = {
    componentManifest: componentManifest
  , dockerImage: dockerImage
}

plugin.utils = {
  getJSON: getJSON
}

/**
 * Write your tasks like
 * task.mytask = ...
 *
 * task-kumori includes a number of task plugins
 * (the ones needed to implement its predefined tasks)
 *
 * If you write a task with the same name as one of the predefined tasks,
 * your task will override it.
 */

module.exports = tasks;
