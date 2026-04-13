import { useAnecdotes } from "../hooks/useAnecdotes"
import { useNotify } from "../NotificationContext"

const AnecdoteForm = () => {
  const { addAnecdote: addToServer} = useAnecdotes()
  const notify = useNotify()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content= event.target.anecdote.value
    event.target.reset()
    addToServer(content)
    notify(`added anecdote '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm