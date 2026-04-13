import { createContext, useContext, useState } from 'react'

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notifMessage, setNotifMessage] = useState('')

  return (
    <NotifContext.Provider value={{ notifMessage, setNotifMessage }}>
      {props.children}
    </NotifContext.Provider>
  )
}

export const useNotifValue = () => {
  const {notifMessage} = useContext(NotifContext)
  return notifMessage
}

export const useNotify = () => {
  const { setNotifMessage } = useContext(NotifContext)

  return(message) => {
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage('')
    }, 5000)
  }
}

export default NotifContext