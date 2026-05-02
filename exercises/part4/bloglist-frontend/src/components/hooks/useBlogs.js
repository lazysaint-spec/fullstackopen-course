import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../../services/blogs'

export const useBlogs = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey:['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['blogs'] })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['blogs'] })
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blogObject }) => blogService.update(id, blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['blogs'] })
    },
    onError: (error) => {
      console.error('error updating blog:', error.response)
    }
  })

  const addCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    },
    onError: (error) => {
      console.error('error adding comment:', error.response)
    }
  })

  return {
    blogs: result.data,
    isPending: result.isPending,
    createBlog: newBlogMutation,
    deleteBlogMutation,
    updateBlogMutation,
    addCommentMutation
  }
}