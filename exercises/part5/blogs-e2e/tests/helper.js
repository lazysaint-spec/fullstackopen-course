const loginWith = async (page, username, password)  => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, contentTitle, contentAuthor, contentUrl) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title').fill(contentTitle)
  await page.getByLabel('author').fill(contentAuthor)
  await page.getByLabel('url').fill(contentUrl)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }