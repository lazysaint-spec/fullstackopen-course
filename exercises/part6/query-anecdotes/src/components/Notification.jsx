import { useNotifValue } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notifMessage = useNotifValue()

  if (!notifMessage) return null

  return (
    <div style={style}>
      {notifMessage}
    </div>
  )
}

export default Notification