const customLogger = require("../logger/logger");

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = customLogger();
}

module.exports = logger;
