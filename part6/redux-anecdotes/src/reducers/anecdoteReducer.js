import anecdotesService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE_NOTE': {
      let voted = state.find(anecdote => anecdote.id === action.data.id)
      voted.votes = voted.votes + 1
      let newState = state.map(anecdote => (anecdote.id === voted.id) ? voted : anecdote).sort((a, b) => b.votes - a.votes)
      return state = newState
      // const id = action.data.id
      // const anecdoteToChange = state.find(n => n.id === id)
      // const changedAnecdote = { 
      //   ...anecdoteToChange, 
      //   votes: anecdoteToChange.votes + 1 
      // }
      // console.log('changed anecdote', changedAnecdote)
      // return state.map(anecdote =>
      //   anecdote.id !== id ? anecdote : changedAnecdote )
      }
      // return state = {...state, votes: state.id.votes + 1}
    case 'NEW_NOTE':
      const newState = state.concat(action.data).sort((a, b) => b.votes - a.votes)
      return newState
    case 'INIT_NOTES':
      return action.data
  }
  return state
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const notes = await anecdotesService.getAll()
    dispatch ({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.vote(id)
    dispatch ({
      type: 'VOTE_NOTE',
      data: {id: votedAnecdote.id, votes: votedAnecdote.votes}
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch ({
      type: 'NEW_NOTE',
      data: newAnecdote
    })
  }
}

export default reducer