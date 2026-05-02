import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = { paddingRight: 5 }
  return (
    <div>
      <Link style={{ ...padding, pointerEvents:user ? 'auto': 'none' }} to="/">blogs</Link>
      <Link style={{ ...padding, pointerEvents:user ? 'auto': 'none' }} to="/create">new blog</Link>
      {!user &&
        <Link style={padding} to="/login">login</Link>
      }
      {user &&
        <button onClick={handleLogout}>logout</button>
      }
    </div>
  )
}

export default Menu
