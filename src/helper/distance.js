const {DISTANCE} = require('../helper/constants')
const dotenv = require('dotenv')
dotenv.config()

const calcDistance = async (req, res)=>{
    try {
    const apiKey = DISTANCE.DISTANCE_MATRIX
    const origins = `7Span, 201, Isquare Corporate Park, Science City Rd, Panchamrut Bunglows II, Sola, Ahmedabad, Gujarat 380060`
    const destinations = `Iscon Cross Road, Ramdev Nagar, Ahmedabad, Gujarat`
    apiURL = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`
    
    const response = await fetch(apiURL);
    const data = await response.json();
    
    return res.json({
        success: true,
        data: data,
        message: "Distance between two cordinates"
    })
} catch (error) {
        return res.json({
            success: false,
            message: "Error occured at calculating distance "+error
        })
    }
}

module.exports = calcDistance;
