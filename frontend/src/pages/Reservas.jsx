import { useEffect, useState } from 'react'
import { quartosService } from '../services/api'

const Reservas = () => {
  const [quartos, setQuartos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuartos()
  }, [])

  const loadQuartos = async () => {
    try {
      setLoading(true)
      const response = await quartosService.getAll()
      setQuartos(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar reservas:', error)
    } finally {
      setLoading(false)
    }
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reservas</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">
          Sistema de reservas em desenvolvimento. Aqui você poderá gerenciar todas as reservas do hotel.
        </p>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quartos Disponíveis</h2>
          {quartos.length === 0 ? (
            <p className="text-gray-500">Nenhum quarto cadastrado.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quartos.map((quarto) => (
                <div
                  key={quarto.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800">{quarto.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{quarto.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Disponível
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reservas

