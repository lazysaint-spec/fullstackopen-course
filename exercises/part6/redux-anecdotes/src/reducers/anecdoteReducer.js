import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    upvoted(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes+1
      }
      return state
        .map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, setAnecdotes, upvoted } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newAnecdotes))
  }
}

export const upvoteAnecdotes = (content) => {
  return async (dispatch, getState) => {
    dispatch(upvoted(content.id))
    const currentState = getState()
    const newlyUpdatedAnecdote = currentState.anecdote.find(a => a.id === content.id)
    await anecdotesService.update(content.id, newlyUpdatedAnecdote)
  }
}

export default anecdoteSlice.reducer
