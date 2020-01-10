# Find the Capital CLI

Command line tool that allows user to get capital of any country based on full country name or ISO 3166 country codes (alpha-2 & alpha-3);

### Setup local dev environment:

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

### Application usage flows:

#### Positive

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


#### Test execution
    
```
    npm test 
```

![running_e2e_tests]

[running_e2e_tests]: https://raw.githubusercontent.com/OlegKonyk/find-the-capital-js/master/images/running_e2e_tests.gif