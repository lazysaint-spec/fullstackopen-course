import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (city) => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    getWeather,
}