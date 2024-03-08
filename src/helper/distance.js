const { DISTANCE } = require("../helper/constants");
const {trueResponse, falseResponse} = require('../configs/responseMes')
const dotenv = require("dotenv");
dotenv.config();
const logger = require('../utils/indexLogger')

const calcDistance = async (req, res) => {
  try {
    const apiKey = DISTANCE.DISTANCE_MATRIX;
    const { origins, destinations } = req.body;
    apiURL = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=driving&departure_time=now&key=${apiKey}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    const traveledDistance = data.rows[0].elements[0].distance.value;
    const totalFare = Math.ceil(traveledDistance * 0.022);
    logger.info(`Total Fare :${totalFare} INR`);
    

    return trueResponse(res, response)
  } catch (error) {
    return falseResponse(res, error)
  }
};

module.exports = calcDistance;
