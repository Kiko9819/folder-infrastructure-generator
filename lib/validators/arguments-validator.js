const regex = require('../../app-constants');

const validators = {
    validateProjectName(argv) {
        let projectNameIsValid = true;
        const name = argv.projectName;

        if (name === '') {
            projectNameIsValid = false;
        } else if (name === undefined) {
            projectNameIsValid = false;
        } else if (name === null) {
            projectNameIsValid = false;
        } else if (name.match(regex.projectName)) {
            projectNameIsValid = false;
        }

        return projectNameIsValid;
    }
};

module.exports = validators;
