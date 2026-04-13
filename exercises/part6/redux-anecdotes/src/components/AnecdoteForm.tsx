import { useDispatch, useSelector } from "react-redux"
import { createNotif } from "../reducers/notifReducer"
import { appendAnecdotes } from "../reducers/anecdoteReducer"
import { setNotif } from "../reducers/notifReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // const newAnecdotes = await anecdotesService.createNew(content)
    dispatch(appendAnecdotes(content))
    const message = `You created '${content}'`
    // dispatch(createNotif(message))
    // setTimeout(() => {
    //   dispatch(createNotif(''))
    // }, 5000)
    dispatch(setNotif(message, 5000))
  }

  return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div> 
  )
}

export default AnecdoteForm