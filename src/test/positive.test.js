import { assert } from "chai";
import { execute, DOWN, ENTER } from './utils/execute';

describe('Single country by name', function () {
  this.timeout(10000);
  before(async function () {
    this.response = await execute(
      'dist/app/index.js',
      [],
      [
        ENTER,
        'Ukraine',
        ENTER,
        DOWN,
        ENTER
      ]
    );

    return this.response;
  })

  it("true is true", function () {
    console.log(this.response);
    assert.isTrue(true);
  });

});

describe('Single country by code', function () {
  this.timeout(10000);
  before(async function () {
    this.response = await execute(
      'dist/app/index.js',
      [],
      [
        DOWN,
        ENTER,
        'USA',
        ENTER,
        DOWN,
        ENTER
      ]
    );

    return this.response;
  })

  it("true is true", function () {
    console.log(this.response);
    assert.isTrue(true);
  });

});


describe('Two countries: 1st - name, 2nd - code', function () {
  this.timeout(15000);
  before(async function () {
    this.response = await execute(
      'dist/app/index.js',
      [],
      [
        ENTER,
        'Mexico',
        ENTER,
        ENTER,

        DOWN,
        ENTER,
        'TR',
        ENTER,
        DOWN,
        ENTER
      ]
    );

    return this.response;
  })

  it("true is true", function () {
    console.log(this.response);
    assert.isTrue(true);
  });

});