const validators = require('../validators/arguments-validator');
const fs = require('fs');

const Files = {
    mkd(argv) {
        const defaultProject = !argv.simple && argv.simple === undefined;

        const makeComplexInfrastructure = () => {

        };

        if (defaultProject || argv.simple === true) {
            const simpleInfrastructure = require('../infrastructures/simple');

            if (validators.validateProjectName(argv)) {
                const currentPathWithProjectName = `${process.cwd()}/${argv.projectName}`;

                fs.mkdir(currentPathWithProjectName, {recursive: true}, err => {
                    if (err) throw err;
                });
            }

            (function create(folder, o) {
                for (const key in o) {
                    if (typeof o[key] === 'object' && o[key] !== null) {
                        fs.mkdir(folder + key, {recursive: true}, () => {
                            if (Object.keys(o[key]).length) {
                                create(folder + key + '/', o[key]);
                            }
                        });
                    } else {
                        const normalFile = folder + key + (o[key] === null ? '' : '.' + o[key]);
                        fs.writeFile(normalFile, '', (err) => {
                            if (err) console.log('error', err);
                        });
                    }
                }
            })(`${argv.projectName}/`, simpleInfrastructure);
        } else {
            makeComplexInfrastructure()
        }
    },

};


module.exports = Files;
