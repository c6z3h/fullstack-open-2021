import React from 'react'

// Header takes care of rendering the name of the course
const Header = (props) => {
	console.log(props)
	return <h1>{props.course}</h1>
}


// Part renders the parts and number of exercises
const Part = (props) => {
	// console.log(props)
	return <p>{props.part} {props.exercises}</p>
}

// Content prints content
const Content = (props) => {
	console.log(props)
	
	return (
	  <div>
	    <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
	    <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
	    <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
	  </div>
)}

// Total renders total number of exercises
const Total = (props) => {
	return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
}

// App is the root that renders the App
const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
		  {
			name: 'Fundamentals of React',
			exercises: 10
		  },
		  {
			name: 'Using props to pass data',
			exercises: 7
		  },
		  {
			name: 'State of a component',
			exercises: 14
		  }
		]
	  }

  return (
   <div>
	<Header course={course.name} />
	<Content parts={course.parts} />
	<Total parts={course.parts} />
   </div>
  )
}

export default App
