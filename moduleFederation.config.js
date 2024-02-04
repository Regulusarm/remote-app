//const deps = require("./package.json").dependencies;

module.exports = {
  name: "remoteApp",
  filename: "remoteEntry.js",
      exposes: {
        "./RemoteApp": "./src/RemoteApp",
      },
  shared: {
   react: {
    eager: true,
    singleton: true
   },
   'react-dom': {
    eager: true,
    singleton: true
   },
   'react-router-dom': {
    eager: true,
    singleton: true
   }
  }
 };