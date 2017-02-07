"use strict";
var Table = require("easy-table");
var moment = require("moment");
function resultsAsTable(results) {
    var t = new Table;
    results.forEach(function (result) {
        t.cell('Download', result.download.toFixed(2));
        t.cell('Upload', result.upload.toFixed(2));
        t.cell('Ping', result.ping.toFixed(1));
        t.cell('ISP', result.isp);
        t.cell('Time', moment(result.measuredAt).format('DD.MM.YYYY HH:mm'));
        t.newRow();
    });
    return t.toString();
}
exports.resultsAsTable = resultsAsTable;
