import axios from "axios";

async function getDataByWoeid(woeid) {
    return await axios.get(`https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
}
export default getDataByWoeid;