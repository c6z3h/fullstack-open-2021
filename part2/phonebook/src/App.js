import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  // 1. INITIALIZE
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  // Event Handler
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  // Filter
  const peopleToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

  // Submission Handler (name, number)
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const personsArray = persons.map(person => person.name)
    // Throw Error If Name Already in List
    if (personsArray.includes(`${newName}`)){
        // Error Message
        window.alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat(personObject))
      }
      setNewName('')
      setNewNumber('')
  }
 
  const addPersonData = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      <div>
        {peopleToShow.map(persons =>
            <Persons persons={persons} />
        )}
      </div>
    </div>
  )
}

export default App