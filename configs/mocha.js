module.exports = {
  timeout: 20000,
  spec: ["dist/test/*.test.js"],
  reporter: "mocha-multi-reporters",
  ["reporter-options"]: "configFile=./configs/multi.reporter.config.json"
};
