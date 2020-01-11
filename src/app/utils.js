const api = 'https://restcountries.eu/rest/v2';

const markup = {
    start: '\n############## FIND THE CAPITAL #############\n',
    exit: '\n########## EXITING THE APPLICATION ##########\n',
};

const questions = {
    askForCountry: 'Are we searching by country name or country code?',
    askForNextStep: 'Do you want to do more queries?',
};

function countryInputValidator(input, searchType) {
    const validators = {
        name: {
            reg: /^[a-zA-Z\s]*$/,
            msg: `only characters and white space allowed; value entered: ${input}`,
        },
        alpha: {
            reg: /^[a-zA-Z]{2,3}$/,
            msg: `only 2 or 3 characters and allowed; value entered: ${input}`,
        },
    };
    return new Promise((resolve, reject) => {
        if (input.match(validators[searchType].reg)) {
            resolve(true);
        } else reject(`BAD INPUT: ${validators[searchType].msg} <<`);
    });
}

export { api, markup, questions, countryInputValidator };
