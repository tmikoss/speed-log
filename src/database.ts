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
    type TEXT,
    measuredAt TEXT
  )
`

const insertResultSql = `
  INSERT INTO results (download, upload, ping, ip, isp, host, type, measuredAt)
  VALUES ($download, $upload, $ping, $ip, $isp, $host, $type, $measured_at)
`

db.run(createResultsTable)

export class Result {
  download: number
  upload: number
  ping: number
  ip: string
  isp: string
  host: string
  type: string
  measuredAt?: Date

  constructor(fields: any = {}){
    const { download, upload, ping, ip, isp, host, type } = fields
    const measuredAt = fields.measuredAt ? new Date(fields.measuredAt) : new Date

    this.download = Number(download)
    this.upload = Number(upload)
    this.ping = Number(ping)
    this.ip = ip
    this.isp = isp
    this.host = host
    this.type = type
    this.measuredAt = measuredAt
  }

  static selectAll(): Promise<Result[]> {
    return new Promise<Result[]>((resolve, reject) => {
      db.all("SELECT * FROM results ORDER BY measuredAt DESC", (err, rows) => {
        if(err) {
          reject(err)
          return
        }

        resolve(rows.map(row => {
          return new Result(row)
        })
      })
    })
  }

  persist() {
    this.measuredAt = this.measuredAt || new Date

    db.run(insertResultSql, {
      "$download": this.download,
      "$upload": this.upload,
      "$ping": this.ping,
      "$ip": this.ip,
      "$isp": this.isp,
      "$host": this.host,
      "$type": this.type,
      "$measured_at": this.measuredAt.toISOString()
    })
  }
}
