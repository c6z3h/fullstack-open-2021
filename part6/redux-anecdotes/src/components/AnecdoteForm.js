import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const add = async (event) => {
		event.preventDefault()
        let content = {}
		content.content = event.target.anecdote.value
        content.votes = 0
		event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.addNotification(`you added '${content.content}'`, 1)
        // setTimeout(() => dispatch(removeNotification('')), 1500)
	}

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => { return }
const mapDispatchToProps = {
    createAnecdote,
    addNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
// export default AnecdoteForm 