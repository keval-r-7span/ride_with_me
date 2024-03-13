const moment = require("moment");

const DateTimeFormatter = (timeString) => {
  const formattedTime = moment(timeString).format("h:mm:ss a");
  const formattedDate = moment(timeString).format("Do MMMM YYYY");
  return formattedDate + "," + formattedTime;
};

module.exports = DateTimeFormatter;
