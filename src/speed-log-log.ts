import * as speedTest from 'speedtest-net'

import { Result } from './database'
import { resultsAsTable } from './display'

const test = speedTest({ maxTime: 5000 })

test.on('data', ({ speeds: { download, upload }, client: { ip, isp }, server: { host, ping } }) => {
  const result = new Result({ download, upload, ip, isp, host, ping })

  result.persist()

  console.log(resultsAsTable([result]))
})

test.on('error', (error) => {
  console.error(error)
})
