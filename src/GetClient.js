const AuthenticationProvider = require("./AuthenticationProvider");
var graph = require("@microsoft/microsoft-graph-client");
const common = require("@bgroves/common");
require("isomorphic-fetch");

module.exports = function () {
  // eslint-disable-line no-unused-vars
  const clientOptions = {
    defaultVersion: "v1.0",
    debugLogging: false,
    authProvider: new AuthenticationProvider(),
  };
  return graph.Client.initWithMiddleware(clientOptions);
};
