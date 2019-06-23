const validators = require('../validators/arguments-validator');
const fs = require('fs');

const Files = {
    mkd(argv) {
        const defaultProject = !argv.simple && argv.simple === undefined;

        const makeComplexInfrastructure = () => {

        };

        const create = (folder, structure) => {
            for (const key in structure) {
                if (structure.hasOwnProperty(key)) {
                    if (typeof structure[key] === 'object' && structure[key] !== null) {
                        fs.mkdir(`${folder}${key}`, {recursive: true}, () => {
                            if (Object.keys(structure[key]).length) {
                                create(`${folder}${key}/`, structure[key]);
                            }
                        });
                    } else {
                        const normalFile = folder + key + (structure[key] === null ? '' : '.' + structure[key]);

                        fs.writeFile(normalFile, '', (err) => {
                            if (err) console.log('error', err);
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

            create(`${argv.projectName}/`, simpleInfrastructure);
        };

        if (defaultProject || argv.simple) {
            makeSimpleInfrastructure();
        } else {
            makeComplexInfrastructure()
        }
    },

};


module.exports = Files;
