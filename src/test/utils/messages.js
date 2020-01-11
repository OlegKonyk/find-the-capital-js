function successMessage(country, capital) {
    return `Capital of ${country} is ${capital}.`;
}

function notFoundMessage(country) {
    return `ERROR: status 404 - Not Found for input: ${country}`;
}

function badNameMessage(country) {
    return `BAD INPUT: only characters and white space allowed; value entered: ${country}`;
}

function badCodeMessage(country) {
    return `BAD INPUT: only 2 or 3 characters and allowed; value entered: ${country}`;
}

export { successMessage, notFoundMessage, badNameMessage, badCodeMessage };
