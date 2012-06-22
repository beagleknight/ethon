var config = module.exports;

config["Ethon tests"] = {
  rootPath: "../",
  environment: "browser", // or "node"
  sources: [
    "lib/request_animation_frame.js",
    "lib/ethon.js",
    "lib/*.js"
  ],
  tests: [
    "test/*.js"
  ]
}
