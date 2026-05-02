import { useParams } from 'react-router-dom'
import { useUsers } from './hooks/useUsers'
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const { users, isPending } = useUsers()

  if (isPending) {
    return <div>Loading user details...</div>
  }

  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
        {user.name}
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Added blogs
      </Typography>

      <Paper>
        <List>
          {user.blogs.map(blog => (
            <ListItem key={blog.id} divider>
              <ListItemText primary={blog.title} />
            </ListItem>
          ))}
          {user.blogs.length === 0 && (
            <ListItem>
              <ListItemText primary="This user hasn't added any blogs yet." sx={{ fontStyle: 'italic', color: 'gray' }} />
            </ListItem>
          )}
        </List>
      </Paper>
    </div>
  )
}

export default User