import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios de Usuario
export const usuarioService = {
  registrar: async (datosUsuario) => {
    try {
      const response = await api.post('/usuarios/registro', datosUsuario);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },

  login: async (credenciales) => {
    try {
      const response = await api.post('/usuarios/login', credenciales);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Credenciales inválidas');
    }
  },

  loginSoloEmail: async (email) => {
    try {
      const response = await api.post(`/usuarios/login-email?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Usuario no encontrado');
    }
  },

  test: async () => {
    try {
      const response = await api.get('/usuarios/test');
      return response.data;
    } catch (error) {
      throw new Error('Error conectando con el servidor');
    }
  }
};

// Servicios de Hierbas
export const hierbaService = {
  listarTodas: async () => {
    try {
      const response = await api.get('/hierbas');
      return response.data;
    } catch (error) {
      throw new Error('Error al cargar las hierbas');
    }
  },

  registrar: async (datosHierba) => {
    try {
      const response = await api.post('/hierbas', datosHierba);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar hierba');
    }
  },

  buscarPorNombre: async (nombre) => {
    try {
      const response = await api.get(`/hierbas/buscar?nombre=${encodeURIComponent(nombre)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error en la búsqueda');
    }
  },

  buscarPorCategoria: async (categoria) => {
    try {
      const response = await api.get(`/hierbas/categoria/${encodeURIComponent(categoria)}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar por categoría');
    }
  },

  listarPorUsuario: async (usuarioId) => {
    try {
      const response = await api.get(`/hierbas/usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al cargar hierbas del usuario');
    }
  },

  eliminar: async (hierbaId) => {
    try {
      await api.delete(`/hierbas/${hierbaId}`);
      return true;
    } catch (error) {
      throw new Error('Error al eliminar hierba');
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/hierbas/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Hierba no encontrada');
    }
  },

  test: async () => {
    try {
      const response = await api.get('/hierbas/test');
      return response.data;
    } catch (error) {
      throw new Error('Error conectando con el servidor');
    }
  }
};

export default api;