import { useState, useEffect } from 'react'
import Filter from './services/components/Filter'
import Country from './services/components/Country'
import entryService from './services/components/entries'
import weatherService from './services/components/weather'

function App() {
  const [countries, setCountries] = useState([]) 
  const [search, setSearch] = useState('')
  const [temp, setTemp] = useState([])

  useEffect(() => {
    console.log('effect')
    getData()
  }, [])

  const getData = () => {
    entryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response,...([] || props.countries))
      })
  }

  const handleSearch = (event) => {
    if (countries.length <= 1) {
      getData()
    }
    setSearch(event.target.value)
  }

  const checkSearch = (country) => {
    return country.name.common.toLowerCase().includes(search.toLowerCase())
  }

  const searchCountry = !search
    ? []
    : countries.filter(checkSearch)

  useEffect(() => {
    if (searchCountry.length === 1) {
      const [country] = searchCountry
      fetchWeather(country)
    }
  }, [search])
  
  const fetchWeather = (country) => {
    const cap = country.capital?.[0]

    weatherService.getWeather(cap).then(response => {
      console.log('Weather data:', response)
      setTemp(response)
    })
  }

  const showCountry = (id) => {
    const selected = countries.filter(country => country.cca3 == id)
    setCountries(selected)
    if (selected.length === 1) {
      fetchWeather(selected)
    }
  }

  return (
      <div>
        <Filter
          search={search}
          handleSearch={handleSearch}
        />
        <Country 
          searchCountry={searchCountry}
          showCountry={showCountry}
          temp={temp}
        />
      </div>
  )
}

export default App
