import React, { useState } from 'react'

const Statistics = ({text,value}) => {
	if (text==='positive'){
		return(
			<p>{text} {value} %</p>
		)
	}
	return (
		<p>{text} {value}</p>
	)
  }

const StatisticDisplay = (good,neutral,bad) => {
	console.log(good)
	const total = good + neutral + bad
	const average = (-1*bad + 1*good)/total
	const positive = good / total * 100
	if (total===0){
		return(
			'No feedback given'
		)
	}
	
	return (
	<div>
	<Statistics text="good" value={good} />
	<Statistics text="neutral" value={neutral} />
	<Statistics text="bad" value={bad} />
	<Statistics text="all" value={total} />
	<Statistics text="average" value={average} />
	<Statistics text="positive" value={positive} />
	</div>
	  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
	  <h1>{"give feedback"}</h1>
      
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
	  <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      
	  <h1>{"Statistics"}</h1>
	  <StatisticDisplay good={good} neutral={neutral} bad={bad}/>
	  
    </div>
  )
}

export default App