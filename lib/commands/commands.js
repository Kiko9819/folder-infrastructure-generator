const Files = require('../files/files');

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
            Files.mkdir(argv);
        }
    }
};

module.exports = commands;
