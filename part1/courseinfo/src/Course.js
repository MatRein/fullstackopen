import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((accumulation, currentPart) => {
    // console.log(accumulation)
    return(accumulation + currentPart.exercises)
  },0) // 0 is the initial value for the accumulation. This is needed for reduce to work with objects
  return(
    <p className="total">Number of exercises {total}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Course = ({course}) => {
    return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course