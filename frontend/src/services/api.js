import axios from 'axios'
import { supabase } from './supabase'

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

export const cadastroService = {
  create: async (dados) => {
    // Verificar se o Supabase está configurado
    if (!supabase) {
      const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
      const errorMsg = isProduction 
        ? 'Supabase não está configurado no Render. Configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas configurações de ambiente do serviço no painel do Render.'
        : 'Supabase não está configurado. Configure as variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env do frontend.'
      throw new Error(errorMsg)
    }

    // Preparar dados para inserção no Supabase
    const dadosUsuario = {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      cpf: dados.cpf,
      data_nascimento: dados.dataNascimento,
      senha: dados.senha, // Nota: em produção, a senha deve ser hasheada
      endereco_rua: dados.endereco.rua,
      endereco_numero: dados.endereco.numero,
      endereco_complemento: dados.endereco.complemento || null,
      endereco_cidade: dados.endereco.cidade,
      endereco_estado: dados.endereco.estado,
      endereco_cep: dados.endereco.cep,
      created_at: new Date().toISOString(),
    }

    // Inserir dados na tabela 'usuarios' do Supabase
    const { data, error } = await supabase
      .from('usuarios')
      .insert([dadosUsuario])
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return data
  },
}

export default api

