const files = require('../files/files');
const validators = require('../validators/arguments-validator');
const fs = require('fs');

const commands = {
    'new': {
        command: 'new',
        describe: 'creates the base infrastructure of the website',
        builder: {
            projectName: {
                describe: 'The projects root folder name',
                demandOption: true,
                type: 'string'
            },
            simple: {
                describe: 'Helps with creating a simple or more complex infrastructure',
                demandOption: false,
                type: 'boolean'
            }
        },
        handler(argv) {
            if (validators.validateProjectName(argv)) {
                fs.mkdir(`${process.cwd()}/customDir`, {recursive: true}, err => {
                    if (err) throw err;
                });
            }
        }
    }
};

module.exports = commands;
