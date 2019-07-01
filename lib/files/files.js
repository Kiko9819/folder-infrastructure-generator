const fs = require('fs');

const Validators = require('../validators/arguments-validator');
const appConstants = require('../../app-constants');

const Files = {
    mkdir(argv) {
        const defaultProject = !argv.simple && argv.simple === undefined;

        const createStructure = (folder, structure) => {
            for (const key in structure) {
                if (structure.hasOwnProperty(key)) {
                    if (typeof structure[key] === 'object' && structure[key] !== null) {
                        fs.mkdir(`${folder}${key}`, {recursive: true}, () => {
                            if (Object.keys(structure[key]).length) {
                                createStructure(`${folder}${key}/`, structure[key]);
                            }
                        });
                    } else {
                        const normalFile = folder + key + (structure[key] === null ? '' : '.' + structure[key]);

                        fs.writeFile(normalFile, this.getFileContent(structure, key), (err) => {
                            if (err) console.log('error', err);
                        });
                    }
                }
            }
        };

        const makeSimpleInfrastructure = () => {
            const simpleInfrastructure = require('../infrastructures/simple'); // good practice or not?

            if (Validators.validateProjectName(argv)) {
                const currentPathWithProjectName = `${process.cwd()}/${argv.projectName}`;

                fs.mkdir(currentPathWithProjectName, {recursive: true}, err => {
                    if (err) throw err;
                });
            }

            createStructure(`${argv.projectName}/`, simpleInfrastructure);
        };

        if (defaultProject || argv.simple) {
            makeSimpleInfrastructure();
        }
    },
    getFileContent(structure, key) {
        if (structure[key] === appConstants.FILE_EXTENSIONS.HTML) {
            return fs.readFileSync('./lib/infrastructures/html.txt', 'utf-8', () => {
                console.log('done');
            });
        }

        return '';
    },
};

module.exports = Files;
