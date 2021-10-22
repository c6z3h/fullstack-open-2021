import React from 'react'

// Header takes care of rendering the name of the course
const Header = (props) => {
	return (
	  <div>
	    <h1>{props.course}</h1>
	  </div>
)}


// Part renders the parts and number of exercises
const Part = (props) => {
	return (
	  <div>
	    <p>{props.part} {props.exercises}</p>
	  </div>
)}

// Content prints content
const Content = () => {
	return (
	  <div>
	    <Part part={"Fundamentals of React"} exercises={10} />
	    <Part part={"Using props to pass data"} exercises={7} />
	    <Part part={"State of a component"} exercises={14} />
	  </div>
)}

// Total renders total number of exercises
const Total = (props) => {
	return (
	  <div>
	    <p>Number of exercises {props.value}</p>
	  </div>
)}

// App is the root that renders the App
const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <div>
{/* new format */}
	<Header course={course} />
	<Content />
	<Total value={exercises1 + exercises2 + exercises3} />
   </div>
  )
}

export default App