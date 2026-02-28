const Blogs = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    id: '6984ac0f841e685080de4530',
    title: 'Nineteen Eighty-Four',
    author: 'George Orwell',
    url: 'www.1984.com',
    likes: 24
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    url: 'www.TheHobbit.com',
    likes: 39
  },
]

const nonExistingId = async () => {
  const blog = new Blogs({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blogs.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  usersInDb
}