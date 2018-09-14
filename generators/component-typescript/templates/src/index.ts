import {
  BaseComponent,
  ChannelHash,
  ConfigurationHash,
  Reply,
  ResourceHash,
  Runtime
} from '@kumori/component'
import * as http from '@kumori/http-message'
// go write something interesting

export default class Component extends BaseComponent {

  private httpChannel: Reply

  constructor (runtime: Runtime
    , role: string
    , iid: string
    , incnum: number
    , localData: string
    , resources: ResourceHash
    , parameters: ConfigurationHash
    , dependencies: ChannelHash
    , offerings: ChannelHash
  ) {
    super(runtime, role, iid, incnum, localData, resources, parameters, dependencies, offerings)
    this.httpChannel = offerings.endpoint
  }

  run (): void {
    super.run()
    const server = http.createServer()
    server.on('request', (req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('Hello World\n')
    })

    server.listen(this.httpChannel)
  }
}
