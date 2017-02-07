#!/usr/bin/env node
"use strict";
var program = require("commander");
program
    .version('1.0.0')
    .command('log', 'test and log current speeds', { isDefault: true })
    .command('list', 'list previous results')
    .parse(process.argv);
