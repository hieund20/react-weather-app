import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import moment from 'moment';

SideBar.propTypes = {
    currentDay: PropTypes.object,
    onClickToggle: PropTypes.func,
    toggleState: PropTypes.string,
    imageUrl: PropTypes.string,
    onSubmit: PropTypes.func,
    locationList: PropTypes.array,
    onChosenLocation: PropTypes.func
};

SideBar.defaultProps = {
    currentDay: null,
    onClickToggle: null,
    toggleState: '',
    imageUrl: '',
    onSubmit: null,
    locationList: null,
    onChosenLocation: null
};

function SideBar(props) {
    const {
        currentDay,
        onClickToggle,
        toggleState,
        imageUrl,
        onSubmit,
        locationList,
        onChosenLocation } = props;

    const [location, setLocation] = useState('');

    function handleClickToggle() {
        if (onClickToggle !== null) {
            if (toggleState === 'SideBar') {
                onClickToggle('Search');
            }
            else if (toggleState === 'Search') {
                onClickToggle('SideBar');
            }
        }
    }

    function handleChange(e) {
        setLocation(e.target.value);
    }

    function handleSubmit() {
        if (onSubmit !== null) {
            onSubmit(location);
        }
    }


    function handleChooseLocation(woeid) {
        if (onChosenLocation !== null) {
            onChosenLocation(woeid);
        }
    }

    return (
        <div className="sideBar">
            {
                toggleState === 'SideBar' &&
                <div className="sideBar-current">
                    <div className="sideBar-current-nav">
                        <div className="sideBar-current-nav-search">
                            <button onClick={handleClickToggle}>
                                Search for places
                            </button>
                        </div>
                        <div className="sideBar-current-nav-location">
                            <button>
                                <span className="material-icons">
                                    my_location
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="sideBar-current-content">
                        <div className="sideBar-current-content-abbreviation">
                            <img
                                src={`${imageUrl}${currentDay.weather_state_abbr}.svg`}
                                alt="abbreviation" />
                        </div>
                        <div className="sideBar-current-content-background">
                            <div>
                                <span class="material-icons">cloud</span>
                                <span class="material-icons">cloud</span>
                            </div>
                            <div>
                                <span class="material-icons">cloud</span>
                                <span class="material-icons">cloud</span>
                            </div>
                        </div>
                        <div className="sideBar-current-content-temperature">
                            {Math.round(currentDay.the_temp)}
                            <span>°C</span>
                        </div>
                        <div className="sideBar-current-content-state">
                            {currentDay.weather_state_name}
                        </div>
                        <div className="sideBar-current-content-date">
                            Today - {moment(currentDay.applicable_date).format("dddd, DD MMM")}
                        </div>
                        <div className="sideBar-current-content-location">
                            <span className="material-icons">
                                location_on
                            </span>
                            <span className="sideBar-current-content-location-text">
                                {currentDay.title}
                            </span>
                        </div>
                    </div>
                </div>
            }
            {
                toggleState === 'Search' &&
                <div className="sideBar-search">
                    <div className="sideBar-search-nav">
                        <span
                            className="material-icons"
                            onClick={handleClickToggle}>close</span>
                    </div>
                    <div className="sideBar-search-box">
                        <div className="sideBar-search-box-input">
                            <span className="material-icons">search</span>
                            <input
                                type="text"
                                placeholder="search location"
                                value={location}
                                onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="sideBar-search-box-button">
                            <button onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                    {
                        locationList !== null &&
                        <div className="sideBar-search-list">
                            {
                                locationList.map((item) => (
                                    <div
                                        className="sideBar-search-list-item"
                                        onClick={() => handleChooseLocation(item.woeid)}>
                                        <span>{item.title}</span>
                                        <span class="material-icons">chevron_right</span>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            }
        </div>

    );
}

export default SideBar;