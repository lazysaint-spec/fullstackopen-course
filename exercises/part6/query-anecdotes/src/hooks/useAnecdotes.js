import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../services/requests'
import { useNotify } from '../NotificationContext'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  const result = useQuery({
  queryKey:['anecdotes'],
  queryFn: getAnecdotes,
  refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${anecdote.content}' added`)
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      notify(errorMessage)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${anecdote.content}' voted`)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, id: getId(), votes: 0}),
    updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }
}