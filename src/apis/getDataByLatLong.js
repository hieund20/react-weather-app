import axios from "axios";

async function getDataByLatLong(lat, long) {
    return await axios.get(`https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`);
}
export default getDataByLatLong;