const fs = require('fs');

const chalk = require('chalk');

const validators = require('../validators/arguments-validator');
const messenger = require('../user-interaction/messenger');

const log = console.log;

const Files = {
    mkd(argv) {
        const defaultProject = !argv.simple && argv.simple === undefined;

        const makeComplexInfrastructure = () => {
            // will make a request for the structure from a db
        };

        const createRootFolder = () => {
            fs.mkdir(`${argv.projectName}`, {recursive: true}, () => {
                log(chalk.green(`Created root folder: '${argv.projectName}'`));
            })
        };

        const createInfrastructure = (folder, structure) => {
            for (const key in structure) {
                if (structure.hasOwnProperty(key)) {
                    if (typeof structure[key] === 'object' && structure[key] !== null) {
                        fs.mkdir(`${folder}${key}`, {recursive: true}, () => {
                            if (Object.keys(structure[key]).length) {
                                log(chalk.blue(`\tCreated ${folder}${key}`));
                                createInfrastructure(`${folder}${key}/`, structure[key]);
                            }
                        });
                    } else {
                        const normalFile = folder + key + (structure[key] === null ? '' : '.' + structure[key]);

                        fs.writeFile(normalFile, '', (err) => {
                            if (err) log(chalk.red('error'), err);
                        });
                    }
                }
            }
        };

        const makeSimpleInfrastructure = () => {
            const simpleInfrastructure = require('../infrastructures/simple'); // good practice or not?

            if (validators.validateProjectName(argv)) {
                const currentPathWithProjectName = `${process.cwd()}/${argv.projectName}`;

                fs.mkdir(currentPathWithProjectName, {recursive: true}, err => {
                    if (err) throw err;
                });
            }

            createRootFolder();

            createInfrastructure(`${argv.projectName}/`, simpleInfrastructure);
        };

        if (defaultProject || argv.simple) {
            makeSimpleInfrastructure();
            messenger.notifyEndOfProjectCreation();
        } else {
            // initialize complex dialog with questions
            // here is where the inquirer will be handy
            makeComplexInfrastructure();
        }
    },

};

module.exports = Files;
