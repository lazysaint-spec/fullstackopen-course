const STORAGE_KEY = 'loggedBlogappUser'

const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }
  return null
}

const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export default { saveUser, getUser, removeUser }