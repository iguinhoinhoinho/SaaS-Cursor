import axios from 'axios'

const API_URL = '/api/items'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const quartosService = {
  getAll: async () => {
    const response = await api.get('/')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/${id}`)
    return response.data
  },

  create: async (quarto) => {
    const response = await api.post('/', quarto)
    return response.data
  },

  update: async (id, quarto) => {
    const response = await api.put(`/${id}`, quarto)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/${id}`)
    return response.data
  },
}

export default api

