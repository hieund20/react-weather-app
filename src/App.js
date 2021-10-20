import { useEffect, useState } from 'react';
import './App.scss';
import Main from './components/Main';
import SideBar from './components/SideBar';

function App() {
  const [currentWoeid, setCurrentWoeid] = useState('565346');
  const [currentDay, setCurrentDay] = useState({});
  const [nextDays, setNextDays] = useState([]);
  const [tomorrow, setTomorrow] = useState({});
  const [toggleState, setToggleState] = useState('SideBar');
  const [locations, setLocations] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [temperatureState, setTemperatureState] = useState('C');
  const imageUrl = "https://www.metaweather.com/static/img/weather/";

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        const requestUrl =
          `https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/${currentWoeid}/`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setCurrentDay({
          min_temp: responseJSON.consolidated_weather[0].min_temp,
          max_temp: responseJSON.consolidated_weather[0].max_temp,
          the_temp: responseJSON.consolidated_weather[0].the_temp,
          weather_state_name: responseJSON.consolidated_weather[0].weather_state_name,
          applicable_date: responseJSON.consolidated_weather[0].applicable_date,
          title: responseJSON.title,
          weather_state_abbr: responseJSON.consolidated_weather[0].weather_state_abbr,
          wind_speed: responseJSON.consolidated_weather[0].wind_speed,
          humidity: responseJSON.consolidated_weather[0].humidity,
          visibility: responseJSON.consolidated_weather[0].visibility,
          air_pressure: responseJSON.consolidated_weather[0].air_pressure,
          wind_direction_compass: responseJSON.consolidated_weather[0].wind_direction_compass
        });
        setTomorrow({
          applicable_date: responseJSON.consolidated_weather[1].applicable_date,
          weather_state_abbr: responseJSON.consolidated_weather[1].weather_state_abbr,
          min_temp: responseJSON.consolidated_weather[1].min_temp,
          max_temp: responseJSON.consolidated_weather[1].max_temp,
        })
        setNextDays([
          {
            applicable_date: responseJSON.consolidated_weather[2].applicable_date,
            weather_state_abbr: responseJSON.consolidated_weather[2].weather_state_abbr,
            min_temp: responseJSON.consolidated_weather[2].min_temp,
            max_temp: responseJSON.consolidated_weather[2].max_temp,
          },
          {
            applicable_date: responseJSON.consolidated_weather[3].applicable_date,
            weather_state_abbr: responseJSON.consolidated_weather[3].weather_state_abbr,
            min_temp: responseJSON.consolidated_weather[3].min_temp,
            max_temp: responseJSON.consolidated_weather[3].max_temp,
          },
          {
            applicable_date: responseJSON.consolidated_weather[4].applicable_date,
            weather_state_abbr: responseJSON.consolidated_weather[4].weather_state_abbr,
            min_temp: responseJSON.consolidated_weather[4].min_temp,
            max_temp: responseJSON.consolidated_weather[4].max_temp,
          },
          {
            applicable_date: responseJSON.consolidated_weather[5].applicable_date,
            weather_state_abbr: responseJSON.consolidated_weather[5].weather_state_abbr,
            min_temp: responseJSON.consolidated_weather[5].min_temp,
            max_temp: responseJSON.consolidated_weather[5].max_temp,
          }
        ])
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchWeatherForecast();
  }, [currentWoeid]);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const requestUrl =
          `https://the-ultimate-api-challenge.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${locations}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setLocationList(responseJSON);
      }
      catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, [locations]);

  function handleClickToggle(mode) {
    if (mode === 'Search') {
      setToggleState('Search');
      return;
    }
    if (mode === 'SideBar') {
      setToggleState('SideBar');
    }
  }

  function handleSearchLocation(location) {
    setLocations(location.toLowerCase());
  }

  function handleChosenLocation(woeid) {
    setCurrentWoeid(woeid);
  }

  useEffect((tempState) => {
    handleConvertTemperature(tempState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureState]);


  function handleConvertTemperature(tempState) {
    if (tempState === 'F') {
      setTemperatureState('F');
      currentDay.the_temp = ToFahrenheit(currentDay.the_temp);
      tomorrow.max_temp = ToFahrenheit(tomorrow.max_temp);
      tomorrow.min_temp = ToFahrenheit(tomorrow.min_temp);

      nextDays.forEach(nextDay => {
        nextDay.min_temp = ToFahrenheit(nextDay.min_temp);
        nextDay.max_temp = ToFahrenheit(nextDay.max_temp);
      });
      return;
    }
    if (tempState === 'C') {
      setTemperatureState('C');
      currentDay.the_temp = ToCelsius(currentDay.the_temp);
      tomorrow.max_temp = ToCelsius(tomorrow.max_temp);
      tomorrow.min_temp = ToCelsius(tomorrow.min_temp);

      nextDays.forEach(nextDay => {
        nextDay.min_temp = ToCelsius(nextDay.min_temp);
        nextDay.max_temp = ToCelsius(nextDay.max_temp);
      });
    }
  }
  //bug: when click again temp this still handle

  function ToFahrenheit(pram) {
    return (pram * 9 / 5) + 32;
  }

  function ToCelsius(pram) {
    return (pram - 32) * 5 / 9;
  }


  return (
    <div className="app">
      <SideBar
        currentDay={currentDay}
        onClickToggle={handleClickToggle}
        toggleState={toggleState}
        imageUrl={imageUrl}
        onSubmit={handleSearchLocation}
        locationList={locationList}
        onChosenLocation={handleChosenLocation}
        on
      />
      <Main
        currentDay={currentDay}
        tomorrow={tomorrow}
        nextDays={nextDays}
        imageUrl={imageUrl}
        onConvertTemperature={(tempState) => handleConvertTemperature(tempState)}
      />
    </div>
  );
}

export default App;
