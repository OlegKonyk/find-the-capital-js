import inquirer from "inquirer";
import axios from "axios";

const API = 'https://restcountries.eu/rest/v2';

export class PromptInputService {
    constructor() { }

    init() {
        console.log(`\n############## FIND THE CAPITAL #############\n`);

        return this.askForCountry()
            .then(responses => {
                return this.findCapital(responses);
            })
            .then(() => {
                return this.askForNextStep();
            })
            .catch(err => {
                console.log("!! ERROR: Something went wrong", err);
                console.log(`\n############# APPLICATION CRASHED ###########\n`);
                process.exit(1);
            });
    }

    exit() {
        console.log(`\n########## EXITING THE APPLICATION ##########\n`);
        process.exit(0);
    }

    findCapital({ country, searchType }) {
        return axios
            .get(`${API}/${searchType}/${country}?fullText=true&fields=capital`)
            .then(response => {
                let countryData = response.data[0] || response.data;

                console.log(
                    `>> Capital of ${country} is ${countryData.capital}.`
                );
            })
            .catch(err => {
                console.log(`>> ERROR: status ${err.response.data.status} - ${err.response.data.message} for input: ${country}`);
            });
    }

    askForCountry() {
        return inquirer
            .prompt({
                type: "list",
                name: "searchType",
                message: "Are we searching by country name or country code?",
                choices: [
                    { name: "Name", value: "name" },
                    { name: "Code", value: "alpha" }
                ]
            })
            .then(({ searchType }) => {
                const readableSearchType = {
                    name: 'name',
                    alpha: 'code'
                };
                return inquirer
                    .prompt({
                        type: "input",
                        name: "country",
                        message: `Enter country's ${readableSearchType[searchType]}`,
                        validate: (input) => {
                            console.log("input", input)
                            const validators = {
                                name: { 
                                    reg: /^[a-zA-Z\s]*$/,
                                    msg: `only characters and white space allowed; value entered: ${input}`
                                },
                                alpha:{
                                    reg: /^[a-zA-Z]{2,3}$/,
                                    msg: `only 2 or 3 characters and allowed; value entered: ${input}`
                                }
                            };
                            return new Promise((resolve, reject) => {
                                if (input.match(validators[searchType].reg)) {
                                    resolve(true);
                                } else (
                                    reject(`BAD INPUT: ${validators[searchType].msg} <<`)
                                )
                                
                            })
                        }
                    })
                    .then(({ country }) => {
                        return { country, searchType };
                    });
            });
    }

    askForNextStep() {
        return inquirer
            .prompt({
                type: "list",
                name: "next",
                message: "Do you want to do more queries?",
                choices: [
                    { name: "Continue", value: true },
                    { name: "Exit", value: false }
                ]
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
