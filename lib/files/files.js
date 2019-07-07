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

// TODO maybe create multiple modules that export local, 3rd party and core modules
const Files = {
    mkdir(argv) {
        const defaultProject = !argv.simple && argv.simple === undefined;

        /*
        * Creates the root folder of the project
        * returns a new Promise and resolves
        * if the creation went successfully
        * otherwise throws an error
        * */
        const createRootFolder = () => {
            return new Promise((resolve, reject) => {
                fs.mkdir(`${argv.projectName}`, {recursive: true}, (err) => {
                    if (err) reject(err);
                    resolve(chalk.green(`Created root folder: '${argv.projectName}'`));
                })
            })
        };

        /*
        * Creates the infrastructure of the project, meaning the folder infrastructure, based on a json file.
        * @param folder - the current folder in the iteration
        * @param structure - the object which comes from the infrastructure files
        *
        * Goes through each key of the structure, which is predefined, and if it is an object
        * it creates a folder(objects in the predefined structure are basically the folders and their names)
        * 1. If the the structure at the current key has one or more nested objects, we call the createInfrastructure
        * function again passing the current folder with the key being the next folder in the object(the nested one)
        * and as the second parameter, which is the value of that key
        * 2. If the structure are that key is not an object the function goes on creating a normal file
        * the name of the file being the key and the extension of the file being the value of that key
        * */
        const createInfrastructure = (folder, structure) => {
            for (const key in structure) {
                if (structure.hasOwnProperty(key)) {
                    if (typeof structure[key] === 'object' && structure[key] !== null) {
                        fs.mkdir(`${folder}${key}`, {recursive: true}, () => {
                            if (Object.keys(structure[key]).length) {
                                console.log(folder + key + '/');
                                createInfrastructure(`${folder}${key}/`, structure[key]);
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

        /*
        * Validates the project name and creates
        * an infrastructure based on the simple
        * infrastructure, defined
        * in the simple.json file
        * */
        const makeSimpleInfrastructure = () => {
            if (Validators.validateProjectName(argv)) {
                createInfrastructure(`${argv.projectName}/`, simpleInfrastructure);
            } else {
                Messenger.errorNotification('Invalid project name, type in \'scaffolder help\' for more details on formatting.')
            }
        };

        /*
        * Decides what the flow of the project building should be
        * if it's a simple project, then the root folder is initialized
        * and the simple, predefined infrastructure is used to create
        * the folder infrastructure, otherwise it should start the
        * flow in which the inquirer is involved by asking the
        * user questions and dynamically creating the folder structure
        * */
        if (defaultProject || argv.simple) {
            createRootFolder().then((successMessage) => {
                Messenger.successNotification(successMessage);
                makeSimpleInfrastructure();
            }).catch(err => {
                Messenger.errorNotification(err);
            });
        }
    },

    /*
    * @param structure - current structure fragment
    * @key - the value of the current structure fragment
    *
    * if it's with an HTML file extension it takes the predefined HTML sceleton from the html.txt file as utf-8
    * otherwise just an empty string
    * */
    getFileContent(structure, key) {
        if (structure[key] === appConstants.FILE_EXTENSIONS.HTML) {
            return fs.readFileSync(path.resolve(__dirname, '../infrastructures/html.txt'), 'utf-8');
        }

        return '';
    }
};

module.exports = Files;
