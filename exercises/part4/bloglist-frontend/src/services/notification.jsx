import { Alert } from "@mui/material"
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === 'success') {
    return <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}> {message} </Alert>
  } else {
    return <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}> {message} </Alert>
  }
}

export default Notification
