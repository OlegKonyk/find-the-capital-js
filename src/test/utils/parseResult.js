function parseResult(input) {
    const reMatch = /\n>>\s(.*)\n/g;
    const reTrim = /\n>>\s|\n/g;
    const result = input.match(reMatch) || [];

    return result.map(str => str.replace(reTrim, ''));
}

function parseInputError(input) {
    const reMatch = /\n>>\s(.*)\s<</g;
    const reTrim = /\n>>\s|\s*<<.*/g;
    const result = input.match(reMatch) || [];

    return result.map(str => str.replace(reTrim, ''));
}

export {
    parseResult,
    parseInputError
}