import {React, useState} from 'react';
import axios from 'axios';
import api from './config';
import './App.css';

function App() {

    const [query, setQuery] = useState('');         // returns a state variable
    const [weather, setWeather] = useState({});
    let [error, setError] = useState('');

    const search_data =(event)=> {
        // prevent the page from being reloaded
        event.preventDefault();
        
        // fetching data
        axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((result) => {     // if successful
            console.log(`Searching for ${query} SUCCESSFUL`);
            setWeather(result.data);
            setError('');
            //setQuery('');
        }).catch((err) => {     // in case of error
            console.log(`Searching for ${query} FAILED`);
            setWeather('');
            setError('Unable to find city! Please check the spelling of the city again. Or check your internet connection.');
        });
    }
    
    return (
        <div className={typeof weather.main!='undefined' ? (weather.main.temp>18?'warm':'cold') : ('cold')}>
            
                <div>
                
                    <form onSubmit={search_data}>
                        <input type="text"
                        className = "searchbar" 
                        placeholder="City Name"
                        onChange = {e => setQuery(e.target.value)}
                        value={query}/>
                    </form>

                    {error !== "" ? (
                        <div className="error-msg">
                            {error}
                        </div>
                    ) : ('') }

                    {(typeof weather.main != 'undefined') ? (
                        <div className="weather-data">
                            <p id="heading-para">{weather.name}, {weather.sys.country} ({weather.coord.lat}, {weather.coord.lon})</p>
                            <p><label>Temperature : </label>{weather.main.temp} degrees.</p>
                            <p><label>[Max, Min] : </label>{weather.main.temp_max}, {weather.main.temp_min}</p>
                            <p><label>Humidity : </label>{weather.main.humidity}%</p>
                            <p>{weather.weather[0].description}</p>
                        </div>
                    ) : ('') }

                </div>
            
        </div>     
    );

}

export default App;