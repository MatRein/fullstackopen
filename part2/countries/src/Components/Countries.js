import React from 'react'


export default function Countries({countries, searchTerm, handleClick}) {
    const filteredCountries = countries
        .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    if(searchTerm==='') return(<div></div>) //IF SearchTerm is empty return nothing
    if(filteredCountries.length > 10) return(<div>Too many countries </div>) //IF SearchTerm is empty return nothing
    if(filteredCountries.length > 1)
        return (
            <div>
                {filteredCountries.map(country => 
                <div key={country.name}>
                <p> {country.name} 
                    <button onClick={() => handleClick(country.name)}>Show</button>
                </p>
                </div>
                )}
            </div>
        )
    else
        return(
            <div>
                {filteredCountries.map(country => 
                    <div key={country.name}> 
                    <h2>{country.name} </h2>
                    <p>{"Capital: " + country.capital}</p>
                    <p>{"Population: " + country.population}</p>
                    <h4>Languages</h4>
                    <ul>
                        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                    </ul>
                    <img src={country.flag} alt="The countries' flag"></img>
                    </div>)}
            </div>
        )
}
