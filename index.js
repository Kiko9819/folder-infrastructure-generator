#!/usr/bin/env node
const filesGenerator = require('./lib/files/files');
const yargs = require('yargs');
// will take site name as a first argument


filesGenerator.init(yargs);
