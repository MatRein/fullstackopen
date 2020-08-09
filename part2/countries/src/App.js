import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchField from './Components/SearchField'
import Countries from './Components/Countries'


function App() {
  //hooks
  const [ countries, setCountries] = useState([
    { name: 'Finnland', inhabitants: 123},
  ]) 
  const [ searchTerm, setTerm] = useState('')

  //import data
  useEffect(() => {
    console.log('effect')    
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {        
      console.log('promise fulfilled')        
      setCountries(response.data)      
    })  }, [])  

  //eventhandler
  const handleSearch = (event) => {
    setTerm(event.target.value)
   }

   const handleClick = (country) => {
    setTerm(country)
   }

  return (
    <div className="App">
      <h2>Country wikipedia</h2>
       <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
       <Countries countries={countries} searchTerm={searchTerm} handleClick={handleClick}/>
    </div>
  );
}

export default App;
