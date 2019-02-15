const path = require('path');
const url = require('url');
const http = require('@kumori/http-message');
const express = require('express');
const q = require('q');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


// REST API v2 implementation.
//
// We have used Express, with only a single thing that is exclusively related
// to Kumori PaaS: instead of using Node.js http module, we are employing Kumori
// httpMessage module (see above require statement). This http server doesn't
// listen on certain IP+port, but on a Kumori channel.
//
// RestApi v2 implements two features:
// - write(key, value)
// - read(key) - returns value
//
// Image to ascii convertsion is provided by ascii role, which is
// reachable through asciiclientChannel channel.

class RestApi {


  constructor(id, entrypointChannel, asciiclientChannel, logger) {
    this.id = id;
    this.entrypointChannel = entrypointChannel;
    this.asciiclientChannel = asciiclientChannel;
    this.logger = logger;
    this.logger.info('RestApi.constructor');
  }


  start() {
    this.logger.info('RestApi.start');

    return q.Promise((resolve, reject) => {
      const expressApp = this._createExpressApp();
      this.httpServer = http.createServer(expressApp);
      // http-message instances can make use of a Winston-like logger
      this.httpServer.logger = this.logger;

      this.httpServer.on('error', err => {
        this.logger.error(`RestApi.start onError ${err.stack}`);
      });

      // Listen on Kumori channel
      this.httpServer.listen(this.entrypointChannel, err => {
        this.logger.info(`RestApi.start listening on channel ${this.entrypointChannel.name}`);

        if (err != null) {
          this.logger.error(`RestApi.start OnListen ${err.stack}`);
          reject(err);
        }
        else {
          resolve();
        }
      });
    });
  }


  stop() {
    this.logger.info('RestApi.stop');

    return q.Promise((resolve, reject) => {
      this.httpServer.close(() => {
        this.logger.info('RestApi.stop stopped');
        resolve();
      });
    });
  }

  _createExpressApp() {
    this.logger.info('RestApi._createExpressApp');

    const app = express();
    let staticPath = path.resolve(__dirname, '..',  'static');
    app.use('/', express.static(staticPath));

    app.get('/image', (req, res) => {
      const query = url.parse(req.url, true).query;
      const filename = query != null ? query.filename : undefined;
      this._processRequest(path.resolve(staticPath,'images',filename), req, res)
    })

    app.post('/image', upload.single('image'), (req, res) => {
      this._processRequest(req.file.path, req, res)
    })

    // app.use((req, res, next) => {
    //   res.status(404).send('Not Found')
    // });

    return app;
  }

  // Sending the request to the ascii converter role.
  //
  // It uses a Request channel:
  //     channel.sendRequest(message, dynamicChannels)
  //     .then (result) -> ...
  //     .fail (err) -> ...
  // - Message: array of segments to be sent.
  //    Segments are either strings or buffers (therefore, objects cannot be
  //    sent directly, they must be serialized).
  // - DynamicChannels: (optional) array of dynamic channels.
  //    Not used in this example.
  // - Result: Object with following keys:
  //     - message: array of segments received in the reply.
  //        Segments are buffers.
  //     - dynamicChannels: array of dynamic channels received in the reply.
  //        Not used in this example.
  // - Err: Error object related to the rejected promise.
  // As an example:
  //  channel.sendRequest([value1, value2, value3], [dynChannel1, dynChannel2])
  //  .then (result) -> ...
  //    // result: { message: [value1, value2, value3],
  //    //            dynamicChannels: [dynChannel1, dynChannel2] }
  //  .fail (err) -> ...
  _processRequest(filepath, req, res) {
    try {
      const query = url.parse(req.url, true).query;
      const key = query != null ? query.key : undefined;

      this.logger.info(`RestApi._convert file=${filepath}`);

      let data = fs.readFileSync(filepath)
      const message = new Buffer(data)
      this.asciiclientChannel.sendRequest([message])
      .then((data) => {
        fs.unlink(filepath)
        let converted = data[0][1].toString();
        this._reply(converted, res)
      })
      .fail((error) => {
        fs.unlink(filepath)
        this._error(error, res)
      })
    } catch(error) {
      fs.unlink(filepath)
      this._error(error, res)
    }

  }

  _reply(data, res) {
    res.send(`<h1>ASCIIART FROM ${this.id}</h1><code><pre>\n${data}\n</pre></code>`);
    res.end()
  }

  _error(error, res) {
    res.status(500).json({ error: (error.message || error) });
  }

}


module.exports = RestApi;
