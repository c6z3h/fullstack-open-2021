import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        // console.log(state.anecdotes)
        return state.anecdotes
        .filter(anecdote => anecdote.content.includes(state.filter))
    })
    const dispatch = useDispatch()

	const vote = (anecdote) => {
		dispatch(addVote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 1))
        // setTimeout(() => dispatch(removeNotification('')), 1500)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList 