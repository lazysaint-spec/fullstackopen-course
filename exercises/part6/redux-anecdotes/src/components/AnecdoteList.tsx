import { useDispatch, useSelector } from 'react-redux'
// import { upvoted } from '../reducers/anecdoteReducer'
import { createNotif } from '../reducers/notifReducer'
import { upvoteAnecdotes } from '../reducers/anecdoteReducer'
import { setNotif } from '../reducers/notifReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdote, filter }) => {
    const filteredAnecdotes = anecdote.filter(a => 
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  
    return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  })
  	
  const dispatch = useDispatch()

  const vote = (anecdote) => {
		// dispatch(upvoted(anecdote.id))
    dispatch(upvoteAnecdotes(anecdote))
		const message = `You voted for '${anecdote.content}'`
    dispatch(setNotif(message, 5000))
		// setTimeout(() => {
    //   dispatch(createNotif(''))
    // }, 5000)
  }

	return (
		<div>
			{anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
			))}
		</div>
	)
}

export default AnecdoteList