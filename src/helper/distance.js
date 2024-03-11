const { DISTANCE } = require("../helper/constants");
const dotenv = require("dotenv");
dotenv.config();

const calcDistance = async (req, res) => {
  try {
    const apiKey = DISTANCE.DISTANCE_MATRIX;
    const { origins, destinations } = req.body;
    apiURL = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=driving&departure_time=now&key=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    const traveledDistance = data.rows[0].elements[0].distance.value;
    const totalFare = Math.ceil(traveledDistance * 0.022);
    console.log(`Total Fare :${totalFare} INR`);

    return res.json({
      success: true,
      data: data,
      message: "Distance between two cordinates",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error occured at calculating distance " + error,
    });
  }
};

module.exports = calcDistance;