import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotif(state, action) {
        return action.payload
    }
  }
})

export const { createNotif } = notificationSlice.actions

export const setNotif = (content, time) => {
  return (dispatch) => {
    dispatch(createNotif(content))
    setTimeout(() => {
      dispatch(createNotif(''))
    }, time)
  }
}

export default notificationSlice.reducer