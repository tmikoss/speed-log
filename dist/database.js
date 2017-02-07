"use strict";
var sqlite = require("sqlite3");
var db = new sqlite.Database("./results.db");
var createResultsTable = "\n  CREATE TABLE IF NOT EXISTS results (\n    download REAL,\n    upload REAL,\n    ping REAL,\n    ip TEXT,\n    isp TEXT,\n    host TEXT,\n    measuredAt TEXT\n  )\n";
var insertResultSql = "\n  INSERT INTO results (download, upload, ping, ip, isp, host, measuredAt)\n  VALUES ($download, $upload, $ping, $ip, $isp, $host, $measured_at)\n";
db.run(createResultsTable);
var Result = (function () {
    function Result(fields) {
        if (fields === void 0) { fields = {}; }
        var download = fields.download, upload = fields.upload, ping = fields.ping, ip = fields.ip, isp = fields.isp, host = fields.host;
        var measuredAt = fields.measuredAt ? new Date(fields.measuredAt) : new Date;
        this.download = Number(download);
        this.upload = Number(upload);
        this.ping = Number(ping);
        this.ip = ip;
        this.isp = isp;
        this.host = host;
        this.measuredAt = measuredAt;
    }
    Result.selectAll = function (_a) {
        var _b = _a === void 0 ? {} : _a, maxDownload = _b.maxDownload, maxUpload = _b.maxUpload, minPing = _b.minPing;
        var query = "SELECT * FROM results WHERE 1=1";
        var queryParams = {};
        if (maxDownload) {
            query += " AND download <= $maxDownload";
            queryParams['$maxDownload'] = maxDownload;
        }
        if (maxUpload) {
            query += " AND upload <= $maxUpload";
            queryParams['$maxUpload'] = maxUpload;
        }
        if (minPing) {
            query += " AND ping >= $minPing";
            queryParams['$minPing'] = minPing;
        }
        query += " ORDER BY measuredAt DESC";
        return new Promise(function (resolve, reject) {
            db.all(query, queryParams, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows.map(function (row) { return new Result(row); }));
                }
            });
        });
    };
    Result.prototype.persist = function () {
        db.run(insertResultSql, {
            "$download": this.download,
            "$upload": this.upload,
            "$ping": this.ping,
            "$ip": this.ip,
            "$isp": this.isp,
            "$host": this.host,
            "$measured_at": this.measuredAt.toISOString()
        });
    };
    return Result;
}());
exports.Result = Result;
