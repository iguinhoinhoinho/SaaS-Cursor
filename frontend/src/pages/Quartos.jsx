import { useEffect, useState } from 'react'
import { quartosService } from '../services/api'
import QuartoForm from '../components/QuartoForm'
import QuartoCard from '../components/QuartoCard'

const Quartos = () => {
  const [quartos, setQuartos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingQuarto, setEditingQuarto] = useState(null)

  useEffect(() => {
    loadQuartos()
  }, [])

  const loadQuartos = async () => {
    try {
      setLoading(true)
      const response = await quartosService.getAll()
      setQuartos(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar quartos:', error)
      alert('Erro ao carregar quartos. Verifique se o backend está rodando.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (quartoData) => {
    try {
      await quartosService.create(quartoData)
      await loadQuartos()
      setShowForm(false)
      alert('Quarto criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar quarto:', error)
      alert('Erro ao criar quarto. Tente novamente.')
    }
  }

  const handleUpdate = async (id, quartoData) => {
    try {
      await quartosService.update(id, quartoData)
      await loadQuartos()
      setEditingQuarto(null)
      alert('Quarto atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar quarto:', error)
      alert('Erro ao atualizar quarto. Tente novamente.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este quarto?')) {
      return
    }

    try {
      await quartosService.delete(id)
      await loadQuartos()
      alert('Quarto deletado com sucesso!')
    } catch (error) {
      console.error('Erro ao deletar quarto:', error)
      alert('Erro ao deletar quarto. Tente novamente.')
    }
  }

  const handleEdit = (quarto) => {
    setEditingQuarto(quarto)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingQuarto(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Quartos</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          >
            <span>➕</span>
            Adicionar Quarto
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8">
          <QuartoForm
            quarto={editingQuarto}
            onSubmit={editingQuarto ? (data) => handleUpdate(editingQuarto.id, data) : handleCreate}
            onCancel={handleCancel}
          />
        </div>
      )}

      {quartos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">Nenhum quarto cadastrado ainda.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Criar Primeiro Quarto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quartos.map((quarto) => (
            <QuartoCard
              key={quarto.id}
              quarto={quarto}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Quartos

