import React from 'react'
import './index'
import Course from './components/Course'

// App is the root that renders the App
const App = ({courses}) => {
	return <Course courses={courses} />
  }

export default App