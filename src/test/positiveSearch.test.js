import { expect } from 'chai';

import { execute, DOWN, ENTER } from './utils/execute';
import { successMessage } from './utils/messages';
import { parseResult } from './utils/parseResult';

describe('Searching single country by name', function() {
    const country = 'Ukraine';
    const capital = 'Kiev';

    before(async function() {
        this.response = await execute([ENTER, country, ENTER, DOWN, ENTER]).then(parseResult);

        return this.response;
    });

    it(`Validate successful message: ${successMessage(country, capital)}`, function() {
        expect(this.response[0]).to.equal(successMessage(country, capital));
    });
});

describe('Searching single country by code', function() {
    const country = 'USA';
    const capital = 'Washington, D.C.';

    before(async function() {
        this.response = await execute([DOWN, ENTER, country, ENTER, DOWN, ENTER]).then(parseResult);

        return this.response;
    });

    it(`Validate successful message: ${successMessage(country, capital)}`, function() {
        expect(this.response[0]).to.equal(successMessage(country, capital));
    });
});

describe('Searching two countries: 1st - name, 2nd - code', function() {
    const country = ['Mexico', 'TR'];
    const capital = ['Mexico City', 'Ankara'];

    before(async function() {
        this.response = await execute([
            ENTER,
            country[0],
            ENTER,
            ENTER,

            DOWN,
            ENTER,
            country[1],
            ENTER,
            DOWN,
            ENTER,
        ]).then(parseResult);

        return this.response;
    });

    country.map((country, i) => {
        it(`Validate successful message: ${successMessage(country, capital[i])}`, function() {
            expect(this.response[i]).to.equal(successMessage(country, capital[i]));
        });
    });
});
