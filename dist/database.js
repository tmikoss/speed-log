"use strict";
var sqlite = require("sqlite3");
var db = new sqlite.Database("./results.db");
var createResultsTable = "\n  CREATE TABLE IF NOT EXISTS results (\n    download REAL,\n    upload REAL,\n    ping REAL,\n    ip TEXT,\n    isp TEXT,\n    host TEXT,\n    type TEXT,\n    measuredAt TEXT\n  )\n";
var insertResultSql = "\n  INSERT INTO results (download, upload, ping, ip, isp, host, type, measuredAt)\n  VALUES ($download, $upload, $ping, $ip, $isp, $host, $type, $measured_at)\n";
db.run(createResultsTable);
var Result = (function () {
    function Result(fields) {
        if (fields === void 0) { fields = {}; }
        var download = fields.download, upload = fields.upload, ping = fields.ping, ip = fields.ip, isp = fields.isp, host = fields.host, type = fields.type;
        var measuredAt = fields.measuredAt ? new Date(fields.measuredAt) : new Date;
        this.download = Number(download);
        this.upload = Number(upload);
        this.ping = Number(ping);
        this.ip = ip;
        this.isp = isp;
        this.host = host;
        this.type = type;
        this.measuredAt = measuredAt;
    }
    Result.selectAll = function () {
        return new Promise(function (resolve, reject) {
            db.all("SELECT * FROM results ORDER BY measuredAt DESC", function (err, rows) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(function (row) {
                    return new Result(row);
                }));
            });
        });
    };
    Result.prototype.persist = function () {
        this.measuredAt = this.measuredAt || new Date;
        db.run(insertResultSql, {
            "$download": this.download,
            "$upload": this.upload,
            "$ping": this.ping,
            "$ip": this.ip,
            "$isp": this.isp,
            "$host": this.host,
            "$type": this.type,
            "$measured_at": this.measuredAt.toISOString()
        });
    };
    return Result;
}());
exports.Result = Result;
