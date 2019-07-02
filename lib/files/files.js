// Core modules
const fs = require('fs');
const path = require('path');

// Local modules
const Validators = require('../validators/arguments-validator');
const appConstants = require('../../app-constants');
const Messenger = require('../user-interaction/messenger');
const simpleInfrastructure = require('../infrastructures/simple');

// 3rd party
const chalk = require('chalk');

// abstractions
const log = console.log;
const cwd = process.cwd(); // current working directory

// TODO maybe create multiple modules that export local, 3rd party and core modules

const Files = {
    mkdir(argv) {
        const defaultProject = !argv.simple && argv.simple === undefined;

        const createRootFolder = () => {
            return new Promise((resolve, reject) => {
                fs.mkdir(`${argv.projectName}`, {recursive: true}, (err) => {
                    if(err) reject(err);
                    resolve(chalk.green(`Created root folder: '${argv.projectName}'`));
                })
            })
        };

        const createStructure = (folder, structure) => {
            for (const key in structure) {
                if (structure.hasOwnProperty(key)) {
                    if (typeof structure[key] === 'object' && structure[key] !== null) {
                        fs.mkdir(`${folder}${key}`, {recursive: true}, () => {
                            if (Object.keys(structure[key]).length) {
                                createStructure(`${folder}${key}/`, structure[key]);
                                log(chalk.blue(`\tCreated ${folder}${key}`));
                            }
                        });
                    } else {
                        const normalFile = folder + key + (structure[key] === null ? '' : '.' + structure[key]);

                        fs.writeFile(normalFile, this.getFileContent(structure, key), (err) => {
                            if (err) Messenger.errorNotification(err);
                        });
                    }
                }
            }
        };

        const makeSimpleInfrastructure = () => {
            if (Validators.validateProjectName(argv)) {
                const currentPathWithProjectName = `${cwd}/${argv.projectName}`;

                fs.mkdir(currentPathWithProjectName, {recursive: true}, err => {
                    if (err) throw err;
                });
            }

            createStructure(`${argv.projectName}/`, simpleInfrastructure);
        };

        if (defaultProject || argv.simple) {
            createRootFolder().then((successMessage) => {
                Messenger.successNotification(successMessage);
                makeSimpleInfrastructure();
            }).catch(err => {
                Messenger.errorNotification(err);
            });
        }
    },
    getFileContent(structure, key) {
        if (structure[key] === appConstants.FILE_EXTENSIONS.HTML) {
            return fs.readFileSync(path.resolve(__dirname, '../infrastructures/html.txt'), 'utf-8');
        }

        return '';
    }
};

module.exports = Files;
