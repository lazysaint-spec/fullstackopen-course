import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './src/reducers/anecdoteReducer'
import filterReducer from './src/reducers/filterReducer'
import notifReducer from './src/reducers/notifReducer'

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notifReducer
  }
})

export default store