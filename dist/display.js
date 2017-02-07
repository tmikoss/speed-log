"use strict";
var Table = require("easy-table");
var moment = require("moment");
function resultsAsTable(results, verbose) {
    if (verbose === void 0) { verbose = false; }
    var t = new Table;
    results.forEach(function (result) {
        t.cell('Time', moment(result.measuredAt).format('DD.MM.YYYY HH:mm'));
        t.cell('Download', result.download.toFixed(2));
        t.cell('Upload', result.upload.toFixed(2));
        t.cell('Ping', result.ping.toFixed(1));
        if (verbose) {
            t.cell('ISP', result.isp);
            t.cell('Client IP', result.ip);
            t.cell('Test server', result.host);
        }
        t.newRow();
    });
    return t.toString();
}
exports.resultsAsTable = resultsAsTable;
