/*global module*/
var config = module.exports;

config["Ethon tests"] = {
    rootPath: "../",
    environment: "browser",
    libs: ["vendor/require.js"],
    tests: [
        "spec/**/*-test.js"
    ],
    resources: [
        "lib/ethon/**/*.js"
    ]
};
