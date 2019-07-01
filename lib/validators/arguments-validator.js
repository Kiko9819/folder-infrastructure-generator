const appConstants = require('../../app-constants');

const Validators = {
    validateProjectName(argv) {
        let projectNameIsValid = true;
        const name = argv.projectName;

        if (name === '') {
            projectNameIsValid = false;
        } else if (name === undefined) {
            projectNameIsValid = false;
        } else if (name === null) {
            projectNameIsValid = false;
        } else if (name.match(appConstants.PROJECT_NAME_REGEX)) {
            projectNameIsValid = false;
        }

        return projectNameIsValid;
    }
};

module.exports = Validators;
