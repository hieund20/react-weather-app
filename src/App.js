import { useEffect, useState } from 'react';
import './App.scss';

import getDataByLatLong from './apis/getDataByLatLong';
import getDataByWoeid from './apis/getDataByWoeid';
import getDataByCityName from './apis/getDataByCityName';

import { ToCelsius, ToFahrenheit } from './utils/convertTemp';

import Main from './components/Main';
import SideBar from './components/SideBar';



function App() {
  const [currentWoeid, setCurrentWoeid] = useState('565346');
  const [currentLocation, setCurrentLocation] = useState({});
  const [currentDay, setCurrentDay] = useState({
    the_temp: 0,
    abbr: '',
    humidity: 0,
    wind_speed: 0,
    wind_direction: '',
    air_pressure: 0,
    visibility: 0
  });
  const [nextDays, setNextDays] = useState([]);

  const [toggleState, setToggleState] = useState('SideBar');
  const [locations, setLocations] = useState('');
  const [locationList, setLocationList] = useState([]);

  const [temperatureState, setTemperatureState] = useState('C');
  const imageUrl = "https://www.metaweather.com/static/img/weather/";


  useEffect(() => {
    getDataByWoeid(currentWoeid)
      .then((res) => {
        setCurrentDay({
          ...res.data,
          the_temp: res.data.consolidated_weather[0].the_temp,
          abbr: res.data.consolidated_weather[0].weather_state_abbr,
          humidity: res.data.consolidated_weather[0].humidity,
          wind_speed: res.data.consolidated_weather[0].wind_speed,
          wind_direction: res.data.consolidated_weather[0].wind_direction_compass,
          air_pressure: res.data.consolidated_weather[0].air_pressure,
          visibility: res.data.consolidated_weather[0].visibility
        });
        setNextDays(res.data.consolidated_weather);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [currentWoeid]);


  useEffect(() => {
    getDataByCityName(locations)
      .then((res) => {
        setLocationList(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
    setTemperatureState('C');
  }

  useEffect((tempState) => {
    handleConvertTemperature(tempState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperatureState]);

  //bug: when click again temp this still handle
  function handleConvertTemperature(tempState) {
    if (tempState === 'F' && temperatureState === 'C') {
      currentDay.the_temp = ToFahrenheit(currentDay.the_temp);
      nextDays.slice(1).forEach(nextDay => {
        nextDay.min_temp = ToFahrenheit(nextDay.min_temp);
        nextDay.max_temp = ToFahrenheit(nextDay.max_temp);
      });
      setTemperatureState('F');
      return;
    }
    if (tempState === 'C' && temperatureState === 'F') {

      currentDay.the_temp = ToCelsius(currentDay.the_temp);
      nextDays.slice(1).forEach(nextDay => {
        nextDay.min_temp = ToCelsius(nextDay.min_temp);
        nextDay.max_temp = ToCelsius(nextDay.max_temp);
      });
      setTemperatureState('C');
    }
  }

  function handleGetCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    });
    setTemperatureState('C');
  }

  useEffect(() => {
    getDataByLatLong(currentLocation.lat, currentLocation.long)
      .then((res) => setCurrentWoeid(res.data[0].woeid))
      .catch((error) => {
        console.log(error);
      })
  }, [currentLocation]);


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
        onCurrentLocation={handleGetCurrentLocation}
        temperatureState={temperatureState}
      />
      <Main
        currentDay={currentDay}
        nextDays={nextDays}
        imageUrl={imageUrl}
        onConvertTemperature={(tempState) => handleConvertTemperature(tempState)}
        temperatureState={temperatureState}
      />
    </div>
  );
}

export default App;
