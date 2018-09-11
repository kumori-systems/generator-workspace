const BaseComponent = require('@kumori/component').BaseComponent;
const http = require('@kumori/http-message');
// go write something interesting

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
      super(runtime, role, iid, incnum, localData, resources, parameters, dependencies, offerings);
      this.httpChannel = offerings.endpoint;
  }

  run () {
    super.run();
    const server = http.createServer();
    server.on('request', (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
    });

    server.listen(this.httpChannel);
  }
}
module.exports = Component;
