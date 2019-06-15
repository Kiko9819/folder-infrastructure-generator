const path = require('path');
const fs = require('fs');
const commands = require('../commands/commands');

const Configuration = {
    init(yargs) {
        this.configureCommands(yargs);
    },
    configureCommands(yargs) {
        yargs.command(commands.new);
        yargs.parse();
    },
};

module.exports = Configuration;
