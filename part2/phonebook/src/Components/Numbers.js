import React from 'react'

export default function Numbers({persons, searchTerm, removeName}) {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(person => 
            <p key={person.name}> 
                {`${person.name} ${person.number} `}
                <button onClick = {() => removeName(person.id)}>Delete</button>
            </p>)}
        </div>
    )
}
