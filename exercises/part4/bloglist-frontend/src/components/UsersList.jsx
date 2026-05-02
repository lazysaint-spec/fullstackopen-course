import { useUsers } from "./hooks/useUsers";
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const UsersList = () => {
  const { users, isPending } = useUsers()

  if (isPending) {
    return <div>Loading users...</div>
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginTop: 4, marginBottom: 2 }}>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}> {user.name} </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersList