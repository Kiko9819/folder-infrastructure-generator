const chalk = require('chalk');
const log = console.log;

const Messenger = {
    initializers: {
        initializingProjectCreation() {
            log(chalk.cyan('Initializing project creation.'));
        }
    },
    notifyEndOfProjectCreation() {
        log(chalk.green('Project creation ended successfully!'));
    },
    errorNotification(err) {
        log(chalk.red('error'), err);
    },
    successNotification(message) {
        log(message);
    }
};

module.exports = Messenger;
