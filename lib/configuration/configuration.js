const commands = require('../commands/commands');
const messenger = require('../user-interaction/messenger');

const Configuration = {
    init(yargs) {
        messenger.initializingProjectCreation();
        this.configureCommands(yargs);
    },
    configureCommands(yargs) {
        yargs.command(commands.new);
        yargs.parse();
    },
};

module.exports = Configuration;
