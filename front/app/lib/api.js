import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const signup = async (email, password) => {
  const response = await api.post('/signup', { email, password });
  return response.data;
};

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const createNote = async (title, body) => {
  const response = await api.post('/notes', { title, body });
  return response.data;
};

export const updateNote = async (id, title, body) => {
  const response = await api.put(`/notes/${id}`, { title, body });
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
export const logout = async () => {
  try {
    // Make a request to the backend to invalidate the token if necessary
    await api.post('/logout');
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    // Always remove the token from localStorage
    localStorage.removeItem('token');
  }
};
export const findNoteById = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};
