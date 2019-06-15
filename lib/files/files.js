const validators = require('../validators/arguments-validator');
const fs = require('fs');

const Files = {
    mkd(argv) {
        if (validators.validateProjectName(argv)) {
            fs.mkdir(`${process.cwd()}/${argv.projectName}`, {recursive: true}, err => {
                if (err) throw err;
            });
        }
    }
};

module.exports = Files;
