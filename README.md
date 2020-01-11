# Find the Capital CLI

Command line tool that allows user to get capital of any country based on full country name or ISO 3166 country codes (alpha-2 & alpha-3) based on [REST COUNTRIES](https://restcountries.eu/#rest-countries).

## Setup local dev environment:

1. Clone the repository:

    ```
        git clone git@github.com:OlegKonyk/find-the-capital-js.git
        cd find-the-capital-js
    ```

2. Make sure nodejs > v10 is installed:

    ```
        node --version
    ```

    See [nodejs.org](https://nodejs.org/) for installation instructions.

3. Install projects dependencies:

    ```
        npm install
    ```

4. Start the app in dev mode:

    ```
        npm run dev:start
    ```

5. Run end to end tests:
    ```
        npm test
    ```

## Project structure:

```
├── configs        // mocha configs
├── dist           // transpiled files [temp]
├── images         // documentation resources
├── node_modules   // nodejs dependencies
├── src
│   ├── app
│   └── test
└── test-results   // HTML results [temp]
```

## Application usage happy flows:

1. Search by country name

    - Start the app
    - Select 'Name' option using arrow keys
    - Enter valid country name. Ex. Unites States of America, Mexico, Ukraine
    - Message with country's capital will be returned
    - Select 'Continue' to make another query or 'Exit' to terminate the application

1. Search by country code

    - Start the app
    - Select 'Code' option using arrow keys
    - Enter valid country code. Ex. US (alpha-2), USA (alpha-2)
    - Message with country's capital will be returned
    - Select 'Continue' to make another query or 'Exit' to terminate the application

![usage_positive]

[usage_positive]: https://raw.githubusercontent.com/OlegKonyk/find-the-capital-js/master/images/usage_positive.gif

## Test coverage

### Implemented

    - positive search
        1. search for single valid country name and code
        2. searching for multiple valid countries on same process

    - negative search
        1. search for non-existing country name and code
        2. searching for multiple non-existing countries on same process

    - input validation
        1. error handling for country names and codes containing integers
        2. error handling for country codes that are not alpha-2 & alpha-3 compatible

### TODO

    1. mock REST APIs to validate upstream failures
    2. implement dynamic/data driven tests
    3. add tests for rest of stdout strings

### Test execution

```
    npm test
```

![running_e2e_tests]

[running_e2e_tests]: https://raw.githubusercontent.com/OlegKonyk/find-the-capital-js/master/images/running_e2e_tests.gif

See HTML report in `./test-results/mochawesome/mochawesome.html`

![report_sample]

[report_sample]: https://raw.githubusercontent.com/OlegKonyk/find-the-capital-js/master/images/report_sample.png

### Continuous integration

Simple [CI pipeline](https://github.com/OlegKonyk/find-the-capital-js/actions) setup with GIT Workflow.

Project is being built and tested on every commit.

![git_workflow]

[git_workflow]: https://raw.githubusercontent.com/OlegKonyk/find-the-capital-js/master/images/git_workflow.png
