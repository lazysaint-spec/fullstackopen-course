import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  TextField
} from '@mui/material'
import { useBlogs } from './hooks/useBlogs'

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const { addCommentMutation } = useBlogs()

  if(!blog) {
    return null
  }

  const likeBlog = (event) => {
    event.preventDefault()
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user?.id
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog.id, blog.title)
    navigate('/')
  }

  const handleComment = (event) => {
    event.preventDefault()
    if(!comment.trim()) return

    addCommentMutation.mutate({ id: blog.id, comment })
    setComment('')
  }

  const isAuthor = currentUser && blog.user?.username === currentUser.username

  return (
    <Card sx={{ marginTop: 3 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>

        <Typography variant="h4" component="h2">
          {blog.title}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          by {blog.author}
        </Typography>

        <Typography variant="body1">
          <Link href={blog.url} target="_blank" rel="noreferrer" underline="hover">
            {blog.url}
          </Link>
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Added by {blog.user?.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
          <Typography variant="body1" fontWeight="bold">
            {blog.likes} likes
          </Typography>

          {currentUser && (
            <Button variant="outlined" color="primary" onClick={likeBlog}>
              LIKE
            </Button>
          )}

          {isAuthor && (
            <Button variant="outlined" color="error" onClick={deleteBlog}>
              REMOVE
            </Button>
          )}
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            comments
          </Typography>

          <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <TextField
              size="small"
              label="add a comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="contained" type="submit">
              ADD COMMENT
            </Button>
          </Box>

          {blog.comments && blog.comments.map((c, index) => (
            <Typography component="li" variant="body1" key={index} sx={{ marginLeft: 5 }}>
              {c}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Blog