import { useState } from 'react'

const BlogForm = ({
  createBlog,
  parentCallback
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

    parentCallback(newAuthor, newTitle)
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return (
    <div>
      <h2> create new </h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
              placeholder='write blog title here'
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              value={newAuthor}
              onChange={event => setNewAuthor(event.target.value)}
              placeholder='write blog author here'
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              value={newURL}
              onChange={event => setNewURL(event.target.value)}
              placeholder='write blog URL here'
            />
          </label>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm