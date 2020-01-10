import { expect } from "chai";
import { execute, successMessage, notFoundMessage, DOWN, ENTER } from './utils/execute';
import { parseResult } from './utils/parseResult';

describe('Searching for incorrect country name', function () {
    const country = 'Wonderland';

    before(async function () {
        this.response = await execute(
            [
                ENTER,
                country,
                ENTER,
                DOWN,
                ENTER
            ]
        ).then(parseResult);

        return this.response;
    })

    it(`Validate Not Found message: ${notFoundMessage(country)}`, function () {
        expect(this.response[0]).to.equal(notFoundMessage(country));
    });
});

describe('Searching for incorrect country code', function () {
    const country = 'XX';

    before(async function () {
        this.response = await execute(
            [
                DOWN,
                ENTER,
                country,
                ENTER,
                DOWN,
                ENTER
            ]
        ).then(parseResult);

        return this.response;
    })

    it(`Validate Not Found message: ${notFoundMessage(country)}`, function () {
        expect(this.response[0]).to.equal(notFoundMessage(country));
    });
});

describe('Searching two countries: 1st - incorrect name, 2nd - correct code', function () {
    const country = ['Xyz land', 'IND'];
    const capital = [, 'New Delhi'];

    before(async function () {
        this.response = await execute(
            [
                ENTER,
                country[0],
                ENTER,
                ENTER,

                DOWN,
                ENTER,
                country[1],
                ENTER,
                DOWN,
                ENTER
            ]
        ).then(parseResult);

        return this.response;
    })

    it(`Validate Not Found message: ${notFoundMessage(country[0])}`, function () {
        expect(this.response[0]).to.equal(notFoundMessage(country[0]));
    });

    it(`Validate successful message: ${successMessage(country[1], capital[1])}`, function () {
        expect(this.response[1]).to.equal(successMessage(country[1], capital[1]));
    });
});