import { useEffect, useState } from "react"
import Search from "../search"


const Weather = () => {

    const [search, setSearch] = useState('')
    const [load, setLoad] = useState(false)
    const [data, setData] = useState(null)

    async function fetchWeather(searchCity) {
        setLoad(true)

        const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${searchCity}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6d65dec7e5msh8cea8203d359363p1c9025jsnb4477f47ad05',
                'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result) {
                setData(result)
                console.log(1);
                setLoad(false)
            }
        } catch (error) {
            setLoad(false)
            console.error(error);
        }
    }

    function handleSearch() {
        fetchWeather(search)
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: "numeric",
            year: 'numeric'
        })
    }
    useEffect(() => {
        fetchWeather('Hyderabad')
    }, [])

    console.log(data);
    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}

            />
            {
                load ? <div className="loading">Loading ...... </div> :
                    <div>
                        {/* <div className="city-name">
                            <h2>{data?.name}, <span>{data?.sys.country}</span></h2>
                        </div> */}
                        <div className="date">
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className="temp">{data?.temp}</div>
                        {/* <p className="description">
                            {data && data.weather && data.weather[0] ? data.weather[0].description : ''}
                        </p> */}
                        <div className="weather-info">
                            <div>
                                <div>
                                    <p>Wind Speed</p>
                                    <p className="wind">{data?.wind_speed}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>Humidity</p>
                                    <p className="humidity">{data?.humidity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
export default Weather
