import React, { useState } from 'react'

const Button = ({action,text}) => (
	<button onClick={action}> {text} </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const min = 0
  const max = anecdotes.length
  const [votes, setVotes] = useState(Array(max).fill(0))

  const random = () => {
	  return Math.floor(Math.random() * max + min)
  }
  
  const next = () => {
	  setSelected(random)
  }

  const vote = () => {
	const newVotes = [...votes]
	newVotes[selected] += 1
	setVotes(newVotes)
  }

  const top = votes.indexOf(Math.max(...votes))

	return (
		<div>
		<h1>Anecdote of the Day</h1>
		<p>{anecdotes[selected]}</p>
		<p>{"has "+votes[selected]+" votes"}</p>
		<Button action={vote} text="vote"/>
		<Button action={next} text="next anecdote"/>
		<h1>Anecdote with Most Votes</h1>
		<p>{anecdotes[top]}</p>
		<p>{"has "+votes[top]+" votes"}</p>
		</div>
	)
}

export default App