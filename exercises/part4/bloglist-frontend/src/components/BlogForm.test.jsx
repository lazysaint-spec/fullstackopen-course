import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const parentCallback = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} parentCallback={parentCallback}/>)

  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write blog URL here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testTitle')
  await user.type(authorInput, 'testAuthor')
  await user.type(urlInput, 'testURL')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testURL',
  })

  console.log(createBlog.mock.calls)
})