import { expect } from 'chai';

import { execute, ENTER, DOWN } from './utils/execute';
import { badNameMessage, badCodeMessage } from './utils/messages';
import { parseInputError } from './utils/parseResult';

describe('Country name input validation: can not contain numbers', function() {
    const country = 'United 22';

    before(async function() {
        this.response = await execute([ENTER, country]).then(parseInputError);

        return this.response;
    });

    it(`Error displayed for name with integers: ${country}`, function() {
        expect(this.response[0]).to.equal(badNameMessage(country));
    });
});

describe('Country code input validation: can not contain numbers', function() {
    const country = 'US1';

    before(async function() {
        this.response = await execute([DOWN, ENTER, country]).then(parseInputError);

        return this.response;
    });

    it(`Error displayed for code with integer: ${country}`, function() {
        expect(this.response[0]).to.equal(badCodeMessage(country));
    });
});

describe('Country code input validation: Must be max 3 characters', function() {
    const country = 'USAA';

    before(async function() {
        this.response = await execute([DOWN, ENTER, country]).then(parseInputError);

        return this.response;
    });

    it(`Error displayed for code more than 3 characters: ${country}`, function() {
        expect(this.response[0]).to.equal(badCodeMessage(country));
    });
});

describe('Country code input validation: Must be min 2 characters', function() {
    const country = 'A';

    before(async function() {
        this.response = await execute([DOWN, ENTER, country]).then(parseInputError);

        return this.response;
    });

    it(`Error displayed for code less than 2 characters: ${country}`, function() {
        expect(this.response[0]).to.equal(badCodeMessage(country));
    });
});
