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

const cadastroApi = axios.create({
  baseURL: '/api/cadastro',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const cadastroService = {
  create: async (dados) => {
    // Por enquanto, usando a mesma API de items até criar endpoint específico
    // Quando o backend tiver endpoint de cadastro, alterar para cadastroApi
    const response = await cadastroApi.post('/', dados).catch(() => {
      // Fallback: usar a API de items temporariamente
      return api.post('/', {
        name: dados.nome,
        description: `Email: ${dados.email} | Telefone: ${dados.telefone} | CPF: ${dados.cpf}`,
      })
    })
    return response.data
  },
}

export default api

