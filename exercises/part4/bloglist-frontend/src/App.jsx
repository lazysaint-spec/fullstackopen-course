import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useNavigate, useMatch, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'


import Notification from './services/notification'
import blogService from './services/blogs'
import loginService from './services/login'
import persistentUser from './services/persistentUser'

import './index.css'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UsersList from './components/UsersList'
import { useBlogs } from './components/hooks/useBlogs'
import User from './components/User'

const ErrorFallback = () => {
  let header = 'Something went wrong :('
  return (
    <div>
      <h2>{header}</h2>
      <text> Please make a bug report to mluukai in Discord</text>
    </div>
  )
}

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const { blogs, createBlog, deleteBlogMutation, updateBlogMutation } = useBlogs()
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)

  const navigate = useNavigate()


  useEffect(() => {
    const user = persistentUser.getUser()
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    const user = await loginService.login({ username, password })

    persistentUser.saveUser(user)
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    createBlog.mutate(blogObject, {
      onSuccess: () => {
        setNotifType('success')
        setNotifMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setNotifType(null)
          setNotifMessage(null)
        }, 5000)
        navigate('/')
      }
    })
  }

  const likeBlog = async (id, blogObject) => {
    updateBlogMutation.mutate({ id, blogObject })
  }

  const deleteBlog = async (id, title) => {
    if(window.confirm(`Delete ${title}?`)) {
      deleteBlogMutation.mutate(id)
    } else {
      console.log('deletion canceled')
    }
  }


  const blogForm = () => (
    <BlogForm
      createBlog = {addBlog}
    >
    </BlogForm>
  )

  const handleLogout = () => {
    persistentUser.removeUser()
    setUser(null)
    setUsername('')
    setPassword('')
    navigate('/login')
  }

  const match = useMatch('/blogs/:id')
  const blog = match && blogs
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const hoverStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={hoverStyle}>blogs</Button>
          <Button color="inherit" component={Link} to="/create" sx={hoverStyle}>new blogs</Button>
          <Button color="inherit" component={Link} to="/users" sx={hoverStyle}>users</Button>
          {!user && <Button color="inherit" component={Link} to="/login" sx={hoverStyle}>login</Button>}
          {user && <Button color="inherit" onClick={handleLogout} sx={hoverStyle}>logout</Button>}
        </Toolbar>
      </AppBar>
      <Notification
        message={notifMessage}
        type={notifType}
      />
      <Routes>
        {!user &&
          <Route path="/login" element={
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => {
                console.log('Refetching')
              }}
            >
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            </ErrorBoundary>
          }/>
        }
        {user &&
          <>
            <Route path="/" element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  console.log('Refetching')
                }}
              >
                <BlogList blogs={blogs} />
              </ErrorBoundary>
            }/>
            <Route path="/blogs/:id" element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  console.log('Refetching')
                }}
              >
                <Blog
                  blog={blog}
                  updateBlog={likeBlog}
                  removeBlog={deleteBlog}
                  currentUser={user}
                />
              </ErrorBoundary>
            }/>
            <Route path="/create" element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  console.log('Refetching')
                }}
              >
                <>
                  {blogForm()}
                </>
              </ErrorBoundary>
            }/>
            <Route path="/users" element={
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => console.log('Refetching')}
              >
                <UsersList />
              </ErrorBoundary>
            }/>
          </>
        }
        <Route path="*" element={
          <div>
            <h2>404 - Page not found</h2>
          </div>
        } />
        <Route path="/users/:id" element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => console.log('Refetching')}
          >
            <User />
          </ErrorBoundary>
        }/>
      </Routes>
    </Container>
  )
}

export default App