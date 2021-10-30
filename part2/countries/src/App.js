import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryFacts from './components/CountryFacts'

const App = () => {
  // 1a. API call for weather
  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('https://weatherstack.com/...')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       console.log(response.data)
  //       setCountries(response.data)
  //     })
  // }
  // useEffect(hook, [])

  // 1b. API call for countries
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  // // 1. INITIALIZE
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  // // Event Handler
  const handleFilterChange = (event) => setFilter(event.target.value)

  // // Filter
  const countriesToShow = filter
        ? countries.filter(countries => countries.name.official.toLowerCase().includes(filter.toLowerCase()))
        : countries
  
  // If only one country on display, display their stats!
  let showCountryFacts = false
  let country = {}
  if (countriesToShow.length === 1){
    showCountryFacts = true
    country = countriesToShow
  }
  // console.log("countries",countries)
  // console.log("country_names",countries.map(country => country.name.official))
  return (
    <div>
      <Filter onChange={handleFilterChange} value={filter} />
      <div>
        {countriesToShow.map(countries =>
            <Countries countries={countries} />
        )}
      </div>
      <div>
        <CountryFacts countries={country} showCountryFacts={showCountryFacts}/>
      </div>
    </div>
  )
}

export default App