import { Result } from './database'
import { resultsAsTable } from './display'

async function selectAndPrint() {
  const results = await Result.selectAll()
  console.log(resultsAsTable(results))
}

selectAndPrint()
