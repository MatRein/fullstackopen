import React, { useState, useEffect } from 'react'
import dbAction from './Services/personServices'
import SearchField from './Components/SearchField'
import PersonForm from './Components/PersonForm'
import Numbers from './Components/Numbers'
import Message from './Components/Message'

const App = () => {

  //dummy data
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  //state Hooks
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNuber] = useState('')
  const [ searchTerm, setTerm] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')    
    dbAction.getAll()
    .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)      
    })  }, []) 

  //eventHandler
  const addName = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      const person = persons.find(p => p.name === newName)
      // return(alert(`${newName} is already added to phonebook`)) //due to early "return" the rest of the function is skipped
      if (window.confirm(`${person.name} exists already. Do you want to update ${person.name}'s number?`)) { 
        const newObject = {...person, number:newNumber}
          dbAction.update(person.id, newObject)    
          .then(response => {      
            console.log(response)
            setPersons(persons.map(p => p.id!==person.id ? p : response.data))
            setNewName('')
            setNewNuber('')
            setMessage(`'${person.name}' was updated`)        
            setTimeout(() => {          
              setMessage(null)        
            }, 5000)   
          })
  
      }
      else console.log("Nothing happened")
    } 
    else {
      const PersonObject = {
        name: newName,
        number: newNumber
      }
      dbAction.create(PersonObject)    
      .then(response => {      
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNuber('')
        setMessage(`'${PersonObject.name}' was added`)        
        setTimeout(() => {          
          setMessage(null)        
        }, 5000)     
      })
    }
}

  const removeName = (id) => {
    if (window.confirm(`Do you really want to delete ${persons.find(person => person.id===id).name}?`)) { 
      dbAction.remove(id)    
      .then(response => {      
        console.log(response)
        setPersons(persons.filter(person => person.id!==id))    
      })
    }
    else console.log("nothing happened")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNuber(event.target.value)
  }

  const handleSearch = (event) => {
   setTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>Add a new entry</h2>
      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Message message={message} />
      <Numbers persons={persons} searchTerm={searchTerm} removeName={removeName}/>
    </div>
  )
}

export default App