import axios from 'axios';

// Create an Axios instance with a base URL
const Api = axios.create({
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

export default Api;