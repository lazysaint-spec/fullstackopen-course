import { useState, useEffect } from 'react'
import Notification from './services/components/Notification'
import Filter from './services/components/Filter'
import PersonForm from './services/components/PersonForm'
import Person from './services/components/Persons'
import entryService from './services/components/entries'
import './index.css'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState()
  const [search, setSearch] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)

  useEffect(() => {
    console.log('effect')
    getData()
  }, [])

   console.log('render', persons.length, 'notes')
  
  const getData = () => {
    entryService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response,...(props.persons || []))
      })
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNumber(event.target.value)
  }

  const checkSearch = (person) => {
    return person.name.toLowerCase().includes(search.toLowerCase())
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(n => n.name === newName)
    const updateNumber = { ...person, number: newNumber}

    console.log('main:', persons.find(n => n.name === newName))

    if (deDup(newName)) {
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`))
        {
          entryService
            .update(person.id, updateNumber)
            .then(response => {
              setPersons(persons.map(p => p.name === newName? response : p ))
            })
            .catch(error => {
              setNotifType('error')
              setNotifMessage(`Information of ${newName} has already been removed from server`)
              setTimeout(() => {
                setNotifType(null)
                setNotifMessage(null)
                getData()
              }, 5000)
            })
        }
      return
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      entryService
        .create(personObject)
        .then(response => { 
          setPersons(persons.concat(response))
          setNewName('')
          setNumber('')
        })
      
      setNotifMessage(`Added ${newName} successfully`)
      setNotifType('success')
      setTimeout(() => {
        setNotifType('null')
        setNotifMessage(null)
      }, 5000)
    }

  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      entryService
      .deleteEntry(id)
      .then(() => {
        [
          setPersons(persons.filter(person => person.id !== id)),
        ]
      })
    } else {
      console.log('deletion canceled')
    }
  }

  const deDup = (nameNew) =>{
    const duplicate = persons.some(person => person.name === nameNew)
    return duplicate
  }

  const searchPerson = !search
    ? persons
    : persons.filter(checkSearch)

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification 
          message={notifMessage}
          type={notifType}
        />
        <Filter 
          search={search}
          handleSearch={handleSearch}
        />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
        <Person 
          searchPerson={searchPerson}
          deletePerson={deletePerson}
        />
    </div>
  )
}

export default App