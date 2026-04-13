import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: message ? 'block' : 'none' // Hide if empty
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification