import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({
  createBlog,
}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2> create new </h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            size="small"
            type="text"
            label="title"
            variant="outlined"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            sx={{ marginBottom: 2, width: 350 }}
            placeholder='write blog title here'
          />
        </div>

        <div>
          <TextField
            size="small"
            type="text"
            label="author"
            variant="outlined"
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            sx={{ marginBottom: 2, width: 350 }}
            placeholder='write blog author here'
          />
        </div>
        <div>
          <TextField
            size="small"
            type="text"
            label="url"
            variant="outlined"
            value={newURL}
            onChange={event => setNewURL(event.target.value)}
            sx={{ marginBottom: 2, width: 350 }}
            placeholder='write blog URL here'
          />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 1 }}>
            create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm