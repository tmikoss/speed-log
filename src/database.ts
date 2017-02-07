import * as sqlite from 'sqlite3'

const db = new sqlite.Database("./results.db")

const createResultsTable = `
  CREATE TABLE IF NOT EXISTS results (
    download REAL,
    upload REAL,
    ping REAL,
    ip TEXT,
    isp TEXT,
    host TEXT,
    measuredAt TEXT
  )
`

const insertResultSql = `
  INSERT INTO results (download, upload, ping, ip, isp, host, measuredAt)
  VALUES ($download, $upload, $ping, $ip, $isp, $host, $measured_at)
`

db.run(createResultsTable)

interface ISelectAll {
  maxDownload?: number
  maxUpload?: number
  minPing?: number
}

export class Result {
  download: number
  upload: number
  ping: number
  ip: string
  isp: string
  host: string
  measuredAt?: Date

  constructor(fields: any = {}){
    const { download, upload, ping, ip, isp, host } = fields
    const measuredAt = fields.measuredAt ? new Date(fields.measuredAt) : new Date

    this.download = Number(download)
    this.upload = Number(upload)
    this.ping = Number(ping)
    this.ip = ip
    this.isp = isp
    this.host = host
    this.measuredAt = measuredAt
  }

  static selectAll({ maxDownload, maxUpload, minPing }: ISelectAll = {}): Promise<Result[]> {
    let query = "SELECT * FROM results WHERE 1=1"
    const queryParams = {}

    if(maxDownload){
      query += " AND download <= $maxDownload"
      queryParams['$maxDownload'] = maxDownload
    }

    if (maxUpload) {
      query += " AND upload <= $maxUpload"
      queryParams['$maxUpload'] = maxUpload
    }

    if (minPing) {
      query += " AND ping >= $minPing"
      queryParams['$minPing'] = minPing
    }

    query += " ORDER BY measuredAt DESC"

    return new Promise<Result[]>((resolve, reject) => {
      db.all(query, queryParams, (err, rows) => {
        if(err) {
          reject(err)
        } else {
          resolve(rows.map(row => new Result(row)))
        }
      })
    })
  }

  persist() {
    db.run(insertResultSql, {
      "$download": this.download,
      "$upload": this.upload,
      "$ping": this.ping,
      "$ip": this.ip,
      "$isp": this.isp,
      "$host": this.host,
      "$measured_at": this.measuredAt.toISOString()
    })
  }
}
