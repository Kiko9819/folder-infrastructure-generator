const path = require('path');
const fs = require('fs');
const commands = require('../commands/commands');

module.exports = {
    init(yargs) {
        this.configureCommands(yargs);
        // this.deleteFolderRecursive(true);
    },
    configureCommands(yargs) {
        yargs.command(commands.new);
        yargs.parse();
    },
    // deleteFolderRecursive(path) {
    //     if(path) {
    //         console.log(path);
    //         path = false;
    //         this.deleteFolderRecursive(path);
    //     }
    // },
    makeDirectory(args) {
        console.log(args);
        // if(args.projectName) {
        //
        // }
        if(args.new) {
            fs.mkdir(`${process.cwd()}/customDir`, {recursive: true}, err => {
                if (err) throw err;
            });
        }
    }
};
