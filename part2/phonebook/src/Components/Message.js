import React from 'react'

export default function Message({message}) {
    const mystyle = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }
      if (message === null) {
        return null
      }
    
      return (
        <div style={mystyle}>
          {message}
        </div>
      )
    }