const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const Blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(Blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blog.comments = blog.comments ? blog.comments.concat(comment) : [comment]
  await blog.save()

  response.status(201).json(blog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = request.user
    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog already deleted or not found' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async(request, response) => {
  const { user, title, author, url, likes }= request.body
  const blogNewProp = {
    user,
    title,
    author,
    url,
    likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogNewProp,
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})


module.exports = blogRouter