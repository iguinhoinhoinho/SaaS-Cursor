import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastroService } from '../services/api'

const Cadastro = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    endereco: {
      rua: '',
      numero: '',
      complemento: '',
      cidade: '',
      estado: '',
      cep: '',
    },
    senha: '',
    confirmarSenha: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório'
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório'
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF inválido (formato: 000.000.000-00)'
    }

    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'Data de nascimento é obrigatória'
    }

    if (!formData.endereco.cep.trim()) {
      newErrors['endereco.cep'] = 'CEP é obrigatório'
    }

    if (!formData.endereco.rua.trim()) {
      newErrors['endereco.rua'] = 'Rua é obrigatória'
    }

    if (!formData.endereco.numero.trim()) {
      newErrors['endereco.numero'] = 'Número é obrigatório'
    }

    if (!formData.endereco.cidade.trim()) {
      newErrors['endereco.cidade'] = 'Cidade é obrigatória'
    }

    if (!formData.endereco.estado.trim()) {
      newErrors['endereco.estado'] = 'Estado é obrigatório'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres'
    }

    if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return value
  }

  const formatCEP = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2')
    }
    return value
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value)
    setFormData((prev) => ({ ...prev, cpf: formatted }))
  }

  const handleCEPChange = (e) => {
    const formatted = formatCEP(e.target.value)
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, cep: formatted },
    }))
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({ ...prev, telefone: formatted }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Preparar dados para envio (remover confirmarSenha)
      const { confirmarSenha, ...dataToSend } = formData
      
      await cadastroService.create(dataToSend)
      alert('Cadastro realizado com sucesso! Você já pode fazer login.')
      navigate('/')
    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      const errorMessage = error.message || 'Erro ao realizar cadastro. Tente novamente.'
      alert(`Erro: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastro de Hóspede</h1>
        <p className="text-gray-600 mb-8">Preencha os dados abaixo para criar sua conta</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dados Pessoais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Seu nome completo"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-2">
                  CPF *
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  maxLength="14"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.cpf ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="000.000.000-00"
                />
                {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  maxLength="15"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.telefone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(00) 00000-0000"
                />
                {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
              </div>

              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dataNascimento && (
                  <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>
                )}
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Endereço</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="endereco.cep" className="block text-sm font-medium text-gray-700 mb-2">
                  CEP *
                </label>
                <input
                  type="text"
                  id="endereco.cep"
                  name="endereco.cep"
                  value={formData.endereco.cep}
                  onChange={handleCEPChange}
                  maxLength="9"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors['endereco.cep'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="00000-000"
                />
                {errors['endereco.cep'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['endereco.cep']}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="endereco.rua" className="block text-sm font-medium text-gray-700 mb-2">
                  Rua *
                </label>
                <input
                  type="text"
                  id="endereco.rua"
                  name="endereco.rua"
                  value={formData.endereco.rua}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors['endereco.rua'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nome da rua"
                />
                {errors['endereco.rua'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['endereco.rua']}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="endereco.numero" className="block text-sm font-medium text-gray-700 mb-2">
                  Número *
                </label>
                <input
                  type="text"
                  id="endereco.numero"
                  name="endereco.numero"
                  value={formData.endereco.numero}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors['endereco.numero'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123"
                />
                {errors['endereco.numero'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['endereco.numero']}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="endereco.complemento" className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  id="endereco.complemento"
                  name="endereco.complemento"
                  value={formData.endereco.complemento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Apartamento, bloco, etc."
                />
              </div>

              <div>
                <label htmlFor="endereco.cidade" className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="endereco.cidade"
                  name="endereco.cidade"
                  value={formData.endereco.cidade}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors['endereco.cidade'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Sua cidade"
                />
                {errors['endereco.cidade'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['endereco.cidade']}</p>
                )}
              </div>

              <div>
                <label htmlFor="endereco.estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="endereco.estado"
                  name="endereco.estado"
                  value={formData.endereco.estado}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors['endereco.estado'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
                {errors['endereco.estado'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['endereco.estado']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Senha */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Segurança</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha *
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.senha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite a senha novamente"
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>
                )}
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro

