import inquirer from "inquirer";
import axios from "axios";

export class PromptInputService {
  constructor() {}

  init() {
    console.log(`

            ########## FIND THE CAPITAL ##########

        `);

    return this.askForCountry()
      .then(responses => {
        return this.findCapital(responses);
      })
      .then(() => {
        return this.askForNextStep();
      })
      .catch(err => {
        console.log("Something went wrong", err);
      });
  }

  exit() {
    console.log(`
        
            ########## EXITING THE APPLICATION ##########
        
        `);
    process.exit(0);
  }

  findCapital({ country, searchType }) {
    // https://restcountries.eu/rest/v2/name/ukraine?fullText=true
    // https://restcountries.eu/rest/v2/alpha/ua
    // https://restcountries.eu/rest/v2/all?fields=name;capital;currencies

    return axios
      .get(`https://restcountries.eu/rest/v2/${searchType}/${country}`)
      .then(response => {
        // need to handle multiples

        let countryData;
        if (Array.isArray(response.data)) {
          countryData = response.data[0];
        } else {
          countryData = response.data;
        }
        console.log(
          `SUCCESS: Capital of ${country} is ${countryData.capital}.`
        );
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
        const examples = {
          name: ["Unites States of America", "Ukraine", "etc"],
          alpha: ["US", "USA", "UA", "UKR", "etc"]
        };

        return inquirer
          .prompt({
            type: "input",
            name: "country",
            message: `Enter country's ${searchType}. Ex: ${examples[
              searchType
            ].join(", ")}.`
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
