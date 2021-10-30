const CountryFacts = ({countries, showCountryFacts}) => {
    const country = countries[0]
    if (showCountryFacts === true){
        // console.log("this is what we could print",country)
        return (
            <ul>
            <li>Capital: {country.capital}<br/></li>
            <li>Population: {country.population}</li>
            </ul>
        )
    }
    else return null
    
}

export default CountryFacts