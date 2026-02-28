const dummy = (blogs) => {
  if(blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  const getTotalLikes = blogs.reduce((prev, cur) => {
    return prev + cur.likes
  }, 0)
  return getTotalLikes
}

const favoriteLikes = (blogs) => {
  const getFavLikes = blogs.reduce((prev, cur) => {
    return(prev && prev.likes > cur.likes) ? prev : cur
  })
  return getFavLikes
}

const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((tally, blog) => {
    tally[blog.author] = (tally[blog.author] || 0) + 1
    return tally
  }, {})

  let topAuthor = ''
  let blogCount = 0

  for (const author in authorCount) {
    if (authorCount[author] > blogCount) {
      topAuthor = author
      blogCount = authorCount[author]
    }
  }

  return {
    author: topAuthor,
    blogs: blogCount
  }
}

const mostLikes = (blogs) => {
  const authorCount = blogs.reduce((tally, blog) => {
    tally[blog.likes] = blog.author
    return tally
  },  {})

  let likesCount = 0
  let topAuthor = ''

  for (const likes in authorCount) {
    likesCount = Math.max(likes)
    topAuthor = authorCount[likes]
  }

  // return {
  //   authorCount
  // }
  return {
    author : topAuthor,
    likes : likesCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteLikes,
  mostBlogs,
  mostLikes
}