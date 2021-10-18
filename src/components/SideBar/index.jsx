import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

SideBar.propTypes = {
    currentDay: PropTypes.object
};

SideBar.defaultProps = {
    currentDay: null
};

function SideBar(props) {
    const { currentDay } = props;
    const [abbreviation, setAbbreviation] = useState({});

    console.log(currentDay.weather_state_abbr);
    useEffect(() => {
        async function fetchWeatherImage() {
            try {
                const requestUrl =
                    `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/static/img/weather/png/${currentDay.weather_state_abbr}.png`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.blob();

                const imageObjectURL = URL.createObjectURL(responseJSON);
                setAbbreviation(imageObjectURL);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchWeatherImage();
    }, []);


    return (
        <div className="sideBar">
            <div className="sideBar-nav">
                <div className="sideBar-nav-search">
                    <button>Search for places</button>
                </div>
                <div className="sideBar-nav-location">
                    <button>
                        <span className="material-icons">
                            my_location
                        </span>
                    </button>
                </div>
            </div>
            <div className="sideBar-content">
                <div className="sideBar-content-abbreviation">
                    <img src={abbreviation} alt="abbreviation" />
                </div>
                <div className="sideBar-content-background">
                    <span class="material-icons">cloud</span>
                    <span class="material-icons">cloud</span>
                    <span class="material-icons">cloud</span>
                    <span class="material-icons">cloud</span>
                </div>
                <div className="sideBar-content-temperature">
                    {Math.round(currentDay.the_temp)}°C
                </div>
                <div className="sideBar-content-state">
                    {currentDay.weather_state_name}
                </div>
                <div className="sideBar-content-date">
                    Today - {currentDay.applicable_date}
                </div>
                <div className="sideBar-content-location">
                    <span className="material-icons">
                        location_on
                    </span>
                    <span className="sideBar-content-location-text">
                        {currentDay.title}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SideBar;