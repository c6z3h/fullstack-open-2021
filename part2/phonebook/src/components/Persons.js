const Persons = ({persons,deletePerson}) => {
    console.log("persons",persons)
    return (
        <div>
        <li className='note' key={persons.id}>
            {persons.name} {persons.number}
            <button onClick={deletePerson}>delete</button>
        </li> 
        </div>
    )
}

export default Persons