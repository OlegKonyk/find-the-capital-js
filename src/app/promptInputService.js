import inquirer from 'inquirer';
import axios from 'axios';

import { api, markup, questions, countryInputValidator } from './utils';

/**
 * Service handling user interactions via CLI
 * Allows user to: select search mode (country name or country code),
 * enter the value, receive the capital name and chose to repeat actions or exit the app.
 */
export class PromptInputService {
    /**
     * Starts the prompt and defines the sequence of app flow.
     * @return {Promise}
     */
    init() {
        console.log(markup.start);
        return this.askForCountry()
            .then(responses => {
                return this.findCapital(responses);
            })
            .then(() => {
                return this.askForNextStep();
            })
            .catch(err => {
                throw err;
            });
    }

    /**
     * Terminates the application with Success status.
     */
    exit() {
        console.log(markup.exit);
        process.exit(0);
    }

    /*
     * Makes a request for country data based on user's query
     *
     * @param {Object} input Aggregated user input from previous questions.
     * @param {string} input.country The name of the user.
     * @param {string} input.searchType The email of the user.
     * @return {Promise<{ capital: String }>} API response.
     */
    findCapital({ country, searchType }) {
        return axios
            .get(`${api}/${searchType}/${country}?fullText=true&fields=capital`)
            .then(response => {
                const countryData = response.data[0] || response.data;
                console.log(`>> Capital of ${country} is ${countryData.capital}.`);
                return countryData;
            })
            .catch(err => {
                const { status, message } = err.response.data;
                console.log(`>> ERROR: status ${status} - ${message} for input: ${country}`);
            });
    }

    /*
     * Asks user to input search type and country value
     *
     * @return {Promise<{ country: String, searchType: String }>} aggregated user input.
     */
    askForCountry() {
        return inquirer
            .prompt({
                type: 'list',
                name: 'searchType',
                message: questions.askForCountry,
                choices: [
                    { name: 'Name', value: 'name' },
                    { name: 'Code', value: 'alpha' },
                ],
            })
            .then(({ searchType }) => {
                const readableSearchType = {
                    name: 'name',
                    alpha: 'code',
                };
                return inquirer
                    .prompt({
                        type: 'input',
                        name: 'country',
                        message: `Enter country's ${readableSearchType[searchType]}`,
                        validate: input => {
                            return countryInputValidator(input, searchType);
                        },
                    })
                    .then(({ country }) => {
                        return { country, searchType };
                    });
            });
    }

    /*
     * Asks user to repeat the query flow or exit the application
     * @return {Promise}
     */
    askForNextStep() {
        return inquirer
            .prompt({
                type: 'list',
                name: 'next',
                message: questions.askForNextStep,
                choices: [
                    { name: 'Continue', value: true },
                    { name: 'Exit', value: false },
                ],
            })
            .then(({ next }) => {
                if (next) {
                    this.init();
                } else {
                    this.exit();
                }
            });
    }
}
