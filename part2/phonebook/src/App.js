import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

import './index.css'

const Footer = () => {
  const footerStyle = {
    color: 'turquoise',
    background: 'maroon',
    fontStyle: 'italic',
    fontSize: 25
  }
  return (
    <div style={footerStyle}>
      <em>Phonebook by (c6z3h)[https://github.com/c6z3h]</em>
    </div>
  )
}

const App = () => {
  
  // 1. READ PERSON(s)
  const hook = () => {
    personService
    .getAll()
    .then(allPersons => {setPersons(allPersons)
    })
  }

  useEffect(hook, [])

  // 1. INITIALIZE
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notifMessage, setNotifMessage] = useState('')

  // Event Handler
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  // Filter
  const peopleToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

  // 2. CREATE or UPDATE PERSON
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personsArray = persons.map(person => person.name.toLowerCase())
    // Throw Error If Name Already in List
    console.log("personsArray", personsArray)
    console.log("${newName}",`${newName}`)
    if (personsArray.includes(`${newName}`.toLowerCase())){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          // if user says "OK" and not "cancel"
          const updateMan = persons.filter(person => person.name === `${newName}`)
          console.log("updateMan is", updateMan[0])
          console.log("updateMan.id is", updateMan[0].id)
          personService
            .update(updateMan[0].id, personObject)
            .catch(error => {
              setNotifMessage(
                `Information of '${newName}' has already been removed from server`
              )
              setTimeout(() => {
                setNotifMessage('')
              }, 5000)
              setPersons(persons.filter(p => p.id !== updateMan[0].id))
            })
            .then(newMan => {
              setPersons(persons.map(person => person.id !== updateMan[0].id ? person : newMan))
            })
        }
        setNotifMessage(`Updated ${newName}`)
        setTimeout(() => {
          setNotifMessage('')
        }, 5000)
      } else {
        personService
          .create(personObject)
          .then(returnedPersons =>{
          setPersons(persons.concat(returnedPersons))
          setNotifMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotifMessage('')
          }, 5000)
        })
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
  
  // 3. DELETE PERSON
  const deletePerson = id => {
    const dangerMan = persons.filter(person => person.id === id)
    console.log(dangerMan)
    if (window.confirm(`Delete ${dangerMan[0].name} ?`)){
      personService
        .remove(id)
        .then(persons =>{
        setPersons(persons)
    })
    }
    
  }

  return (
    <div>
      <Notification message={notifMessage} />
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      <div>
        {peopleToShow.map(persons =>
            <Persons persons={persons} deletePerson={() => deletePerson(persons.id)} />
        )}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default App