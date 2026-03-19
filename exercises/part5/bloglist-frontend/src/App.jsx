import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './services/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Viewable from './components/Viewable'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const getData = async () => {
    try {
      const response = await blogService.getAll()
      console.log('promise fulfilled')
      const sorted = [...response].sort((a,b) => b.likes - a.likes)
      setBlogs(sorted)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
    }
  }

  const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotifType('error')
      setNotifMessage('wrong username or password')
      setTimeout(() => {
        setNotifType(null)
        setNotifMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleCallback = (newAuthor, newTitle) => {
    setNewAuthor(newAuthor)
    setNewTitle(newTitle)
  }

  const addBlog = async (blogObject) => {
    await blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      response.user = user
      setBlogs(blogs.concat(response))

      setNotifType('success')
      setNotifMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {
        setNotifType(null)
        setNotifMessage(null)
      }, 5000)
    } catch (error) {
      setNotifType('error')
      setNotifMessage(error.response.data.error)
      setTimeout(() => {
        setNotifType(null)
        setNotifMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      // setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
      setBlogs(
        blogs
          .map(blog => blog.id === id ? returnedBlog : blog)
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      console.error('error:', error.response.data.error)
    }

  }

  const deleteBlog = async (id, title) => {
    if(window.confirm(`Delete ${title}?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
    } else {
      console.log('deletion canceled')
    }
  }

  const loginForm = () => (
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
    >
    </LoginForm>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm
        createBlog = {addBlog}
        parentCallback = {handleCallback}
      >
      </BlogForm>
    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    // blogService.setToken(user.token)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const logout = () => (
    <div>
      <button onClick={() => handleLogout()}>logout</button>
    </div>
  )

  return (
    <div>
      <Notification
        message={notifMessage}
        type={notifType}
      />
      {!user &&
          loginForm()
      }
      {user && (
        <div>
          <p>
            {user.name} logged in {logout()}
          </p>
          {blogForm()}
          <h2>blogs</h2>
          <div>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={likeBlog}
                removeBlog={deleteBlog}
                currentUser={user}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App