const Countries = ({countries}) => {
    // console.log(persons)
    return (
        <li key={countries.area}>{countries.name.official}</li>
    )
}

export default Countries