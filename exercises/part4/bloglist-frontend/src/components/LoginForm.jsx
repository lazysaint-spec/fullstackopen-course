import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2> log in to application </h2>
      <TextField
        type="text"
        label="Username"
        variant="standard"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      <TextField
        type="text"
        label="Password"
        variant="standard"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
      login
    </Button>
  </form>
)

export default LoginForm