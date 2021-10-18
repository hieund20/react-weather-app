import { useEffect, useState } from 'react';
import './App.scss';
import Main from './components/Main';
import SideBar from './components/SideBar';

function App() {
  const [currentDay, setCurrentDay] = useState({});

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        const requestUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/44418/';

        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        console.log(responseJSON);
        //Nhiet do hien tai
        console.log('Temperature: ', responseJSON.consolidated_weather[0].the_temp);
        //Thoi tiet hien tai
        console.log('Weather state name: ', responseJSON.consolidated_weather[0].weather_state_name);
        //Ngay du doan
        console.log('applicable_date: ', responseJSON.consolidated_weather[0].applicable_date);
        //Dia diem
        console.log('title: ', responseJSON.title);
        //Icon
        console.log('weather_state_abbr: ', responseJSON.consolidated_weather[0].weather_state_abbr);

        setCurrentDay({
          min_temp: responseJSON.consolidated_weather[0].min_temp,
          max_temp: responseJSON.consolidated_weather[0].max_temp,
          the_temp: responseJSON.consolidated_weather[0].the_temp,
          weather_state_name: responseJSON.consolidated_weather[0].weather_state_name,
          applicable_date: responseJSON.consolidated_weather[0].applicable_date,
          title: responseJSON.title,
          weather_state_abbr: responseJSON.consolidated_weather[0].weather_state_abbr
        });
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchWeatherForecast();
  }, []);

  return (
    <div className="app">
      <SideBar
        currentDay={currentDay}
      />
      <Main
        currentDay={currentDay}
      />
    </div>
  );
}

export default App;
