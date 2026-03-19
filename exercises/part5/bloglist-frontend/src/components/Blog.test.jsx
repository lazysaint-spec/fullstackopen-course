import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Lorem',
    author: 'Ipsum'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Lorem Ipsum')

  screen.debug(element)
  expect(element).toBeDefined()
})

test('renders URL and likes', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'Lorem ipsum',
    author: 'dolor sit amet',
    url: 'http://consecteturadipiscingelit.com',
    likes: 10,
    user: { name: 'Test User' }
  }

  render(<Blog blog={blog} />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const urlElement = screen.getByText('http://consecteturadipiscingelit.com', { exact: false })
  const likesElement = screen.getByText('likes 10', { exact: false })

  screen.debug(urlElement)
  screen.debug(likesElement)

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('click like button twice', async () => {
  const handler = vi.fn()
  const user = userEvent.setup()
  const blog = {
    title: 'Lorem ipsum',
    author: 'dolor sit amet',
    url: 'http://consecteturadipiscingelit.com',
    likes: 0,
    user: { name: 'Test User' }
  }

  render(<Blog blog={blog} updateBlog={handler}/>)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handler.mock.calls).toHaveLength(2)
})
