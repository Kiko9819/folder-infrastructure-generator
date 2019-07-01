const chalk = require('chalk');
const log = console.log;

const messenger = {
    initializingProjectCreation() {
        log(chalk.cyan('Initializing project creation.'));
    },
    notifyEndOfProjectCreation() {
        log(chalk.green('Project creation ended successfully!'));
    }
};

module.exports = messenger;
