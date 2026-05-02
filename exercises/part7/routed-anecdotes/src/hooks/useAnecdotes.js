import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    const fetchAnecdotes = async () => {
      try {
        const initialAnecdotes = await anecdoteService.getAll()
        setAnecdotes(initialAnecdotes)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    
    fetchAnecdotes()
  }, [])

  const addAnecdote = async (anecdote) => {
    // setAnecdotes(anecdotes.concat({ ...anecdote, id: Math.round(Math.random() * 10000) }))
    try {
      const returnedAnecdote = await anecdoteService.createNew(anecdote)
      setAnecdotes(anecdotes.concat(returnedAnecdote))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const deleteAnecdote = async (id) => {
    try {
      await anecdoteService.deleteAnecdote(id)
      setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return {
    anecdotes: anecdotes,
    addAnecdote: addAnecdote,
    deleteAnecdote: deleteAnecdote
  } 
}