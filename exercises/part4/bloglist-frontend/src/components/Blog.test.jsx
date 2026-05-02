import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, test, expect, vi } from 'vitest'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('<Blog /> visibility and authentication rules', () => {
  const blog = {
    id: '123',
    title: 'Lorem ipsum',
    author: 'dolor sit amet',
    url: 'http://consecteturadipiscingelit.com',
    likes: 10,
    user: {
      username: 'creator_user',
      name: 'Test Creator'
    }
  }

  test('1. Unauthenticated users see info and likes, but no buttons', () => {
    // currentUser is null (unauthenticated)
    renderWithRouter(<Blog blog={blog} currentUser={null} />)

    // Verify info is displayed
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeDefined()
    expect(screen.getByText('http://consecteturadipiscingelit.com')).toBeDefined()
    expect(screen.getByText(/likes 10/)).toBeDefined()

    // Verify buttons are NOT displayed
    expect(screen.queryByText('like')).toBeNull()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('2. Authenticated non-creators see only the like button', () => {
    // currentUser is logged in, but has a different username than the blog's user
    const currentUser = { username: 'other_user' }

    renderWithRouter(<Blog blog={blog} currentUser={currentUser} />)

    // Verify like button IS displayed
    expect(screen.getByText('like')).toBeDefined()

    // Verify remove button is NOT displayed
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('3. Blog creator sees both the like and delete buttons', () => {
    // currentUser matches the blog's user username
    const currentUser = { username: 'creator_user' }

    renderWithRouter(<Blog blog={blog} currentUser={currentUser} />)

    expect(screen.getByText('like')).toBeDefined()
    expect(screen.getByText('remove')).toBeDefined()
  })

  test('click like button twice calls handler twice', async () => {
    const handler = vi.fn()
    const user = userEvent.setup()
    const currentUser = { username: 'other_user' }

    renderWithRouter(
      <Blog blog={blog} updateBlog={handler} currentUser={currentUser} />
    )

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handler.mock.calls).toHaveLength(2)
  })
})
