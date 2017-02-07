"use strict";
var speedTest = require("speedtest-net");
var database_1 = require("./database");
var display_1 = require("./display");
var test = speedTest({ maxTime: 5000 });
test.on('data', function (_a) {
    var _b = _a.speeds, download = _b.download, upload = _b.upload, _c = _a.client, ip = _c.ip, isp = _c.isp, _d = _a.server, host = _d.host, ping = _d.ping;
    var result = new database_1.Result({ download: download, upload: upload, ip: ip, isp: isp, host: host, ping: ping });
    result.persist();
    console.log(display_1.resultsAsTable([result]));
});
test.on('error', function (error) {
    console.error(error);
});
