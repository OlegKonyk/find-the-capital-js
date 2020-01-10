module.exports = {
  spec: ["src/test/*.test.js"],
  require: "@babel/register",
  reporter: "mocha-multi-reporters",
  ["reporter-options"]: "configFile=./configs/multi.reporter.config.json"
};
