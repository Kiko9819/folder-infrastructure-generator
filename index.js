#!/usr/bin/env node
const Configuration = require('./lib/configuration/configuration');
const yargs = require('yargs');
// will take site name as a first argument


Configuration.init(yargs);
