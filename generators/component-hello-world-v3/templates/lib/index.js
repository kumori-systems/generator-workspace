const BaseComponent = require('@kumori/component').BaseComponent
const http = require('@kumori/http-message')
const url = require('url')

class Component extends BaseComponent {

  constructor
    (runtime
    ,role
    ,iid
    ,incnum
    ,localData
    ,resources
    ,parameters
    ,dependencies
    ,offerings
    ) {
      super(runtime, role, iid, incnum, localData, resources, parameters, dependencies, offerings)
      this.helloChannel = dependencies.hello
      this.httpChannel = offerings.entrypoint
  }

  run () {
    super.run();
    const server = http.createServer();
    server.on('request', (request, response) => {
      try {
        this.helloChannel.sendRequest([''])
        .then((value) => {
          let status = value[0][0].status
          if (status.localeCompare('OK') == 0) {
            let dataBuffer = value[0][1]
            let result = dataBuffer.toString('utf8')
            if (result) {
              response.writeHead(200, {'content-type': 'text/plain'})
              let now = new Date()
              response.write(result)
              response.end()
            } else {
              response.writeHead(500, {'content-type': 'text/plain'})
              response.write("Failed")
              response.end()
            }
          } else {
            response.writeHead(500, {'content-type': 'text/plain'})
            response.write("Failed")
            response.end()
          }
        })
        .catch((error) => {
          response.writeHead(500, {'content-type': 'text/plain'})
          response.write(`Unexpected error: ${error.message || error}`)
          response.end()
        })
      } catch(error) {
        response.writeHead(500, {'content-type': 'text/plain'})
        response.write(`Unexpected error: ${error.message || error}`)
        response.end()
      }
    })

    server.listen(this.httpChannel);
  }
}

module.exports = Component
