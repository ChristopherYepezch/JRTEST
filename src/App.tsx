import { useState, useEffect} from 'react'
import './App.css'
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Example API functions

export const getUsers = async () => {
    const response = await api.get('/');
    return response.data;
};

export const getUserById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('/', userData);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.put(`/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

// Optionally, export all functions as an object
export const userApi = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};


function App() {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    username: ''
  })

  const getUsersData = async () => {
    try {
      const response = await getUsers() 
      setUsers(response)
      console.log("user info",users)
      console.log(response)
    }
    catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  useEffect(() => {
    getUsersData()
    console.log('users', users)
  }
  , [])

  if (users.length === 0) {
    return (
      <div>
        <h1>Lista de Usuarios</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>Cargando usuarios...</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Lista de Usuarios</h1>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Nombre</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Usuario</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Email</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Ciudad</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Teléfono</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Sitio Web</th>
              <th style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>Compañía</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, idx: number) => (
              <tr
                key={user.id}
                style={{
                  background: idx % 2 === 0 ? '#fff' : '#f9fafb',
                  transition: 'background 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#f3f4f6')}
                onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#f9fafb')}
              >
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.id}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.name}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.username}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.email}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.address?.city}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.phone}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.website}</td>
                <td style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #e5e7eb' }}>{user.company?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
