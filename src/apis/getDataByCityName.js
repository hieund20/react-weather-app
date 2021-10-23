import axios from "axios";

async function getDataByCityName(city) {
    return await axios.get(`https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`);
}
export default getDataByCityName;