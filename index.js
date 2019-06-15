#!/usr/bin/env node
const Configuration = require('./lib/configuration/configuration');
const yargs = require('yargs');

Configuration.init(yargs);
