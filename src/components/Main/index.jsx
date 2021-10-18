import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

Main.propTypes = {
    currentDay: PropTypes.object
};

Main.defaultProps = {
    currentDay: null
};

function Main(props) {
    const { currentDay } = props;


    return (
        <div className="main">
            <div className="main-nav">
                <div className="main-nav-celsius">
                    <button>°C</button>
                </div>
                <div className="main-nav-fahrenheit">
                    <button>°F</button>
                </div>
            </div>
            <div className="main-forecast">
                <div className="main-forecast-card">
                    <span className="main-forecast-card-title">
                        Tomorrow
                    </span>
                    <div className="main-forecast-card-abbreviation">
                        <img />
                    </div>
                    <div className="main-forecast-card-temperature">
                        <span className="main-forecast-card-temperature-max">
                            {Math.round(currentDay.max_temp)}°C
                        </span>
                        <span className="main-forecast-card-temperature-min">
                            {Math.round(currentDay.min_temp)}°C
                        </span>
                    </div>
                </div>
                <div className="main-forecast-card">
                    <span className="main-forecast-card-title">
                        Tomorrow
                    </span>
                    <div className="main-forecast-card-abbreviation">
                        <img />
                    </div>
                    <div className="main-forecast-card-temperature">
                        <span className="main-forecast-card-temperature-max">
                            {Math.round(currentDay.max_temp)}°C
                        </span>
                        <span className="main-forecast-card-temperature-min">
                            {Math.round(currentDay.min_temp)}°C
                        </span>
                    </div>
                </div>
                <div className="main-forecast-card">
                    <span className="main-forecast-card-title">
                        Tomorrow
                    </span>
                    <div className="main-forecast-card-abbreviation">
                        <img />
                    </div>
                    <div className="main-forecast-card-temperature">
                        <span className="main-forecast-card-temperature-max">
                            {Math.round(currentDay.max_temp)}°C
                        </span>
                        <span className="main-forecast-card-temperature-min">
                            {Math.round(currentDay.min_temp)}°C
                        </span>
                    </div>
                </div>
                <div className="main-forecast-card">
                    <span className="main-forecast-card-title">
                        Tomorrow
                    </span>
                    <div className="main-forecast-card-abbreviation">
                        <img />
                    </div>
                    <div className="main-forecast-card-temperature">
                        <span className="main-forecast-card-temperature-max">
                            {Math.round(currentDay.max_temp)}°C
                        </span>
                        <span className="main-forecast-card-temperature-min">
                            {Math.round(currentDay.min_temp)}°C
                        </span>
                    </div>
                </div>
                <div className="main-forecast-card">
                    <span className="main-forecast-card-title">
                        Tomorrow
                    </span>
                    <div className="main-forecast-card-abbreviation">
                        <img />
                    </div>
                    <div className="main-forecast-card-temperature">
                        <span className="main-forecast-card-temperature-max">
                            {Math.round(currentDay.max_temp)}°C
                        </span>
                        <span className="main-forecast-card-temperature-min">
                            {Math.round(currentDay.min_temp)}°C
                        </span>
                    </div>
                </div>
            </div>

            <span className="main-highlight-topic">Today's Highlights</span>

            <div className="main-highlight-top">
                <div className="main-highlight-top-card">
                    <span className="main-highlight-top-card-title">Wind status</span>
                    <div className="main-highlight-top-card-wind">
                        <span className="main-highlight-top-card-wind-speed">7</span>
                        <span className="main-highlight-top-card-wind-unit">mph</span>
                    </div>
                    <div className="main-highlight-top-card-direction">
                        <button className="main-highlight-top-card-direction-icon">
                            <span class="material-icons">near_me</span>
                        </button>
                        <span className="main-highlight-top-card-direction-content">WSW</span>
                    </div>
                </div>

                <div className="main-highlight-top-card">
                    <span className="main-highlight-top-card-title">Humidity</span>
                    <div className="main-highlight-top-card-humidity">
                        <span className="main-highlight-top-card-humidity-content">7</span>
                        <span className="main-highlight-top-card-humidity-unit">%</span>
                    </div>
                    <div className="main-highlight-top-card-bar">
                        <div className="main-highlight-top-card-bar-percent">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                        <progress value="32" max="100"></progress>
                        <span className="main-highlight-top-card-bar-unit">%</span>
                    </div>
                </div>
            </div>
            <div className="main-highlight-bottom">
                <div className="main-highlight-bottom-card">
                    <span className="main-highlight-bottom-card-title">Visibility</span>
                    <div className="main-highlight-bottom-card-visibility">
                        <span className="main-highlight-bottom-card-visibility-content">7</span>
                        <span className="main-highlight-bottom-card-visibility-unit">miles</span>
                    </div>
                </div>

                <div className="main-highlight-bottom-card">
                    <span className="main-highlight-bottom-card-title">Air Pressure</span>
                    <div className="main-highlight-bottom-card-air">
                        <span className="main-highlight-bottom-card-air-content">7</span>
                        <span className="main-highlight-bottom-card-air-unit">mb</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;