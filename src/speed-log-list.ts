import * as program from 'commander'

import { Result } from './database'
import { resultsAsTable } from './display'

program
  .option('-v, --verbose', 'display extended data')
  .option('-d, --download [mbit]', 'only results where download speed is below this value', Number)
  .option('-u, --upload [mbit]', 'only results where upload speed is below this value', Number)
  .option('-p, --ping [ms]', 'only results where ping is above this value', Number)
  .parse(process.argv);

async function selectAndPrint() {
  const results = await Result.selectAll({
    maxDownload: program.download,
    maxUpload: program.upload,
    minPing: program.ping
  })
  console.log(resultsAsTable(results, program.verbose))
}

selectAndPrint()
