import { Result } from './database'

import * as Table from 'easy-table'
import * as moment from 'moment'

export function resultsAsTable(results: Result[], verbose: boolean = false): string {
  const t = new Table

  results.forEach(result => {
    t.cell('Time', moment(result.measuredAt).format('DD.MM.YYYY HH:mm'))
    t.cell('Download', result.download.toFixed(2))
    t.cell('Upload', result.upload.toFixed(2))
    t.cell('Ping', result.ping.toFixed(1))
    if(verbose) {
      t.cell('ISP', result.isp)
      t.cell('Client IP', result.ip)
      t.cell('Test server', result.host)
    }
    t.newRow()
  })

  return t.toString()
}
