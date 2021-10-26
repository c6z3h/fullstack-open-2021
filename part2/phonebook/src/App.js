import React, { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    // { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      content: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const namesToShow = showAll
    ? persons
    : persons
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNewName}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(persons => 
          <Persons key={persons.id} persons={persons} />
        )}
      </ul>
    </div>
  )
}

export default App