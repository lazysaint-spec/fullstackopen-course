const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainennn'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Kalle Ilves',
        username: 'kalle',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainennn')
      // await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      
      // const errorDiv = page.locator('.error')
      // await expect(errorDiv).toContainText('wrong username or password')
      // await expect(errorDiv).toHaveCSS('border-style', 'solid')
      // await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      // await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainennn')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Testing Blog Creation', 'Test Author', 'http://test.com')
      // await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('link', { name: 'blogs' }).click()
      // await expect(page.getByText('playwright')).toBeVisible()
      await expect(page.getByRole('link', { name: 'Testing Blog Creation' }).first()).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {

      await createBlog(page, 'Blog for liking', 'Test Author', 'http://test.com')
      
      await page.getByRole('link', { name: 'blogs' }).click()
      
      const blogLink = page.getByRole('link', { name: 'Blog for liking' }).first()
      await expect(blogLink).toBeVisible()
      await blogLink.click()

      const blogContainer = page.locator('.blog')
      await expect(blogContainer).toContainText('Blog for liking')

      const likeButton = page.getByRole('button', { name: 'like' })
      await expect(likeButton).toBeVisible()
      
      await likeButton.click()
    
      await expect(page.getByText(/likes 1/)).toBeVisible()
    })

    test('a blog can be deleted', async ({page}) => {
      await createBlog(page, 'Blog for deletion', 'Test Author', 'http://test.com')
      
      await page.getByRole('link', { name: 'blogs' }).click()
      await page.getByRole('link', { name: 'Blog for deletion' }).first().click()

      page.on('dialog', dialog => dialog.accept())

      const removeButton = page.getByRole('button', { name: 'remove' })
      await removeButton.click()

      await expect(page.getByRole('link', { name: 'Blog for deletion' })).not.toBeVisible()
    })

  //   describe('and a blog exists', () => {
  //     beforeEach(async ({ page }) => {
  //       await createBlog(page, 'a test blog2','playwright2', 'www.playwright2.com')
  //     })
  
  //     test('likes can be changed', async ({ page }) => {
  //       await page.getByRole('button', { name: 'view' }).click()
  //       await page.getByRole('button', { name: 'like' }).click()
  //       await expect(page.getByText('likes 1')).toBeVisible()
  //     })

  //     test('a blog cannot be deleted by another user', async ({ page }) => {
  //       await page.getByRole('button', { name: 'logout' }).click()
  //       await loginWith(page, 'kalle', 'password')
  //       const blogElement = page.locator('.blog').filter({ hasText: 'a test blog2' })
  //       await blogElement.getByRole('button', { name: 'view' }).click()
  //       page.on('dialog', dialog => dialog.accept())
  //       await expect(page.getByText('delete')).not.toBeVisible()
  //     })
  //   })
  // })

  // describe('and several blogs exist', () => {
  //   beforeEach(async ({ page, request }) => {

  //     const loginResponse = await request.post('http://localhost:3003/api/login', {
  //       data: { username: 'mluukkai', password: 'salainennn' }
  //     })
  //     const loginData = await loginResponse.json()
  //     const token = loginData.token

  //     const headers = { 'Authorization': `Bearer ${token}` }

  //     await request.post('http://localhost:3003/api/blogs', {
  //       data: { title: 'The lowest likes', author: 'A', url: 'a.com', likes: 2 },
  //       headers
  //     })
      
  //     await request.post('http://localhost:3003/api/blogs', {
  //       data: { title: 'The most likes', author: 'B', url: 'b.com', likes: 52 },
  //       headers
  //     })
      
  //     await request.post('http://localhost:3003/api/blogs', {
  //       data: { title: 'The middle likes', author: 'C', url: 'c.com', likes: 50 },
  //       headers
  //     })

  //     await page.goto('/') 
  //     await loginWith(page, 'mluukkai', 'salainennn')
  //     // await page.goto('/') 
  //   })

  //   test('blogs are ordered by likes', async ({ page }) => {
  //     const allBlogs = page.locator('.blog')

  //     // await expect(allBlogs.nth(0)).toBeVisible()
  //     await expect(allBlogs.first()).toBeVisible()

  //     await expect(allBlogs.nth(0)).toContainText('The most likes')
  //     await expect(allBlogs.nth(1)).toContainText('The middle likes')
  //     await expect(allBlogs.nth(2)).toContainText('The lowest likes')
  //   })

  //   test('blogs reordered when their likes changes', async ({ page }) => {
  //     const allBlogs = page.locator('.blog')

  //     // await expect(allBlogs.nth(0)).toBeVisible()
  //     await expect(allBlogs.first()).toBeVisible()

  //     const middleBlog = allBlogs.filter({ hasText: 'The middle likes' })
  //     await middleBlog.getByRole('button', { name: 'view' }).click()
  //     await middleBlog.getByRole('button', { name: 'like' }).click()
  //     await middleBlog.getByText('likes 51').waitFor()
  //     await middleBlog.getByRole('button', { name: 'like' }).click()
  //     await middleBlog.getByText('likes 52').waitFor()
  //     await middleBlog.getByRole('button', { name: 'like' }).click()
  //     await middleBlog.getByText('likes 53').waitFor()

  //     await expect(allBlogs.nth(0)).toContainText('The middle likes')
  //     await expect(allBlogs.nth(1)).toContainText('The most likes')
  //     await expect(allBlogs.nth(2)).toContainText('The lowest likes')
  //   })
  })
})

