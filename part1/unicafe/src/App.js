import React, { useState } from 'react'

const StatisticLine = ({text,value}) => {
	if (text==='positive'){
		return(<tr><td>{text} {value} %</td></tr>)
	}
	return(<tr><td>{text} {value}</td></tr>)
}

const Statistics = ({good,neutral,bad}) => {
	const total = good + neutral + bad
	const average = (-1*bad + 1*good)/total
	const positive = good / total * 100

	if (total===0){
		return(<tbody><tr><td>{"No feedback given"}</td></tr></tbody>)
	}
	return(
		<tbody>
		  <StatisticLine text="good" value={good} />
		  <StatisticLine text="neutral" value={neutral} />
		  <StatisticLine text="bad" value={bad} />
		  <StatisticLine text="all" value={total} />
		  <StatisticLine text="average" value={average} />
		  <StatisticLine text="positive" value={positive} />
		</tbody>
	  )
  }

const StatisticDisplay = ({good,neutral,bad}) => {
	return (
	<table>
		<Statistics good={good} neutral={neutral} bad={bad} />
	</table>
	  )
}

const Button = (props) => (
	<button onClick={props.handleClick}>
		{props.text}
	</button>
)

// SEE TOPIC: Conditional Rendering and Event Handling Revisited
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
	  <h1>{"give feedback"}</h1>
      
	  <Button handleClick={() => setGood(good + 1)} text="good" />
	  <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
	  <Button handleClick={() => setBad(bad + 1)} text="bad" />
      
	  <h1>{"statistics"}</h1>
	  <StatisticDisplay good={good} neutral={neutral} bad={bad}/>
	  
    </div>
  )
}

export default App