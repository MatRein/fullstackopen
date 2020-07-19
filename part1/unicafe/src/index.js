import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// import "./index.css"

const Button = ({text, handeClick}) => {
  return(
    <div>
      <button onClick={handeClick}>
        {text}
      </button>
    </div>
  )
}

const Statistics = ({text, value}) =>{
  return <p>{text} {value}</p>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handeGoodClick = () =>{
    setGood(good+1)
  }

  const handelNeutralClick = () =>{
    setNeutral(neutral+1)
  }

  const handelBadClick = () =>{
    setBad(bad+1)
  }

  const all = good+neutral+bad

  if(all===0) return(
    <div>
      <h2>Give Feedback</h2>
      <Button text={"good"} handeClick={handeGoodClick}/> 
      <Button text={"neutral"} handeClick={handelNeutralClick}/>
      <Button text={"bad"} handeClick={handelBadClick}/>
      <h2> Statistics </h2>
      No feedback given
    </div>
  )

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text={"good"} handeClick={handeGoodClick}/> 
      <Button text={"neutral"} handeClick={handelNeutralClick}/>
      <Button text={"bad"} handeClick={handelBadClick}/>
      <h2> Statistics </h2>
      <Statistics text={"good"} value={good}/>
      <Statistics text={"neutral"} value={neutral}/>
      <Statistics text={"bad"} value={bad}/>
      <Statistics text={"all"} value={all}/>
      <Statistics text={"average"} value={(good-bad) / all}/>
      <Statistics text={"positive"} value={good / all *100 + "%"}/>
     </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)