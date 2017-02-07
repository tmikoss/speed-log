import * as program from 'commander'

import { Result } from './database'
import { resultsAsTable } from './display'

program
  .option('-v, --verbose', 'display all saved data')
  .parse(process.argv);

async function selectAndPrint() {
  const results = await Result.selectAll()
  console.log(resultsAsTable(results, program.verbose))
}

selectAndPrint()
