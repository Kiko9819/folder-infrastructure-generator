const commands = require('../commands/commands');
const Messenger = require('../user-interaction/messenger');

const Configuration = {
    init(yargs) {
        Messenger.initializers.initializingProjectCreation();
        this.configureCommands(yargs);
    },
    configureCommands(yargs) {
        yargs.command(commands.new);
        yargs.parse();
    },
};

module.exports = Configuration;
