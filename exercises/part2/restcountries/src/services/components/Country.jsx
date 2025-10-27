const CountryFacts = ({selectedCountry, weather}) => {
        return (
            <div>
                {selectedCountry.map(country => (
                    <div key={country.cca3}>
                        <h2>
                            {country.name.common} 
                        </h2>
                        <div>Capital {country.capital}</div>
                        Area {country.area}
                        <h3>
                            Languages
                        </h3>
                        <ul>
                            {Object.values(country.languages).map((speech) => (
                                <li key={speech}>{speech}</li>
                            ))}
                        </ul>
                        <img 
                            src={country.flags.png}
                            alt={`Flag of ${country.name.common}`} 
                            width="150"
                        />
                        <h3>
                            Weather in {country.capital}
                        </h3>
                        {weather && weather.main ? (
                            <div>
                                <div>Temperature: {weather.main.temp}°C</div>
                                <img 
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description}
                                />
                                <div>Wind: {weather.wind.speed} m/s</div>
                            </div>
                            ) : (
                            <div></div>
                            )}
                    </div>  
                ))}  
            </div>
        )
}

const Country = ({ searchCountry , showCountry, temp}) => {
    if (searchCountry.length === 1) {
        return (
            <CountryFacts 
                selectedCountry={searchCountry}
                weather={temp}
            />
        )
    } else if (searchCountry.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else {
        return (
            <div>
                {searchCountry.map(country => (
                    <div key={country.cca3}>
                        {country.name.common} 
                        <button onClick={() => showCountry(country.cca3)}> Show </button>
                    </div>
                ))}
            </div>
        )
    }

}

export default Country