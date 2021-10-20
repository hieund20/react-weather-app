import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import moment from 'moment';

Main.propTypes = {
    currentDay: PropTypes.object,
    tomorrow: PropTypes.object,
    nextDays: PropTypes.array,
    imageUrl: PropTypes.string,
    onConvertTemperature: PropTypes.func
};

Main.defaultProps = {
    currentDay: null,
    tomorrow: null,
    nextDays: null,
    imageUrl: '',
    onConvertTemperature: null
};

function Main(props) {
    const { currentDay, tomorrow, nextDays, imageUrl, onConvertTemperature } = props;

    function handleConvertTemperature(tempState) {
        if (onConvertTemperature !== null) {
            onConvertTemperature(tempState);
        }
    }

    return (
        <div className="main">
            <div className="main-nav">
                <div className="main-nav-container">
                    <div className="main-nav-container-celsius">
                        <button onClick={() => handleConvertTemperature('C')}>°C</button>
                    </div>
                    <div className="main-nav-container-fahrenheit">
                        <button onClick={() => handleConvertTemperature('F')}>°F</button>
                    </div>
                </div>
            </div>
            <div className="main-forecast">
                <div className="main-forecast-card">
                    <span className="main-forecast-card-title">
                        Tomorrow
                    </span>
                    <div className="main-forecast-card-abbreviation">
                        <img
                            src={`${imageUrl}${tomorrow.weather_state_abbr}.svg`}
                            alt="abbreviations" />
                    </div>
                    <div className="main-forecast-card-temperature">
                        <span className="main-forecast-card-temperature-max">
                            {Math.round(tomorrow.max_temp)}°C
                        </span>
                        <span className="main-forecast-card-temperature-min">
                            {Math.round(tomorrow.min_temp)}°C
                        </span>
                    </div>
                </div>
                {
                    nextDays.map((nextDay) => (
                        <div className="main-forecast-card">
                            <span className="main-forecast-card-title">
                                {moment(nextDay.applicable_date).format("dddd, DD MMM")}
                            </span>
                            <div className="main-forecast-card-abbreviation">
                                <img
                                    src={`${imageUrl}${nextDay.weather_state_abbr}.svg`}
                                    alt="abbreviations" />
                            </div>
                            <div className="main-forecast-card-temperature">
                                <span className="main-forecast-card-temperature-max">
                                    {Math.round(nextDay.max_temp)}°C
                                </span>
                                <span className="main-forecast-card-temperature-min">
                                    {Math.round(nextDay.min_temp)}°C
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="main-highlight-topic">
                <span>Today's Highlights</span>
            </div>

            <div className="main-highlight-top">
                <div className="main-highlight-top-card">
                    <span className="main-highlight-top-card-title">Wind status</span>
                    <div className="main-highlight-top-card-wind">
                        <span className="main-highlight-top-card-wind-speed">
                            {Math.round(currentDay.wind_speed)}
                        </span>
                        <span className="main-highlight-top-card-wind-unit">mph</span>
                    </div>
                    <div className="main-highlight-top-card-direction">
                        <button
                            className={`main-highlight-top-card-direction-icon ${currentDay.wind_direction_compass}`}>
                            <span className="material-icons">near_me</span>
                        </button>
                        <span className="main-highlight-top-card-direction-content">
                            {currentDay.wind_direction_compass}
                        </span>
                    </div>
                </div>

                <div className="main-highlight-top-card">
                    <span className="main-highlight-top-card-title">Humidity</span>
                    <div className="main-highlight-top-card-humidity">
                        <span className="main-highlight-top-card-humidity-content">
                            {Math.round(currentDay.humidity)}
                        </span>
                        <span className="main-highlight-top-card-humidity-unit">%</span>
                    </div>
                    <div className="main-highlight-top-card-bar">
                        <div className="main-highlight-top-card-bar-percent">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                        <progress value={Math.round(currentDay.humidity)} max="100"></progress>
                        <span className="main-highlight-top-card-bar-unit">%</span>
                    </div>
                </div>
            </div>
            <div className="main-highlight-bottom">
                <div className="main-highlight-bottom-card">
                    <span className="main-highlight-bottom-card-title">Visibility</span>
                    <div className="main-highlight-bottom-card-visibility">
                        <span className="main-highlight-bottom-card-visibility-content">
                            {(Math.round(currentDay.visibility * 100) / 100).toFixed(1)}
                        </span>
                        <span className="main-highlight-bottom-card-visibility-unit">miles</span>
                    </div>
                </div>

                <div className="main-highlight-bottom-card">
                    <span className="main-highlight-bottom-card-title">Air Pressure</span>
                    <div className="main-highlight-bottom-card-air">
                        <span className="main-highlight-bottom-card-air-content">
                            {Math.round(currentDay.air_pressure)}
                        </span>
                        <span className="main-highlight-bottom-card-air-unit">mb</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Main;