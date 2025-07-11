import api from './api';

export const login = async (correo, password) => {
  try {
    const response = await api.post('/usuarios/login/', { correo, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('auth', 'true');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Error de conexión' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/usuarios/registro/', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Error de conexión' };
  }
};

export const logout = async () => {
  try {
    await api.post('/usuarios/logout/');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};