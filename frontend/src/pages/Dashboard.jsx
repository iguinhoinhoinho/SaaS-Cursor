import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { quartosService } from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQuartos: 0,
    quartosDisponiveis: 0,
    quartosOcupados: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      const response = await quartosService.getAll()
      const quartos = response.data || []
      
      setStats({
        totalQuartos: quartos.length,
        quartosDisponiveis: quartos.length,
        quartosOcupados: 0,
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total de Quartos</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalQuartos}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">🏨</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Quartos Disponíveis</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.quartosDisponiveis}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Quartos Ocupados</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.quartosOcupados}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <span className="text-2xl">🔒</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/quartos"
            className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <span className="text-2xl mb-2 block">➕</span>
            <span className="text-gray-700 font-medium">Gerenciar Quartos</span>
          </Link>
          <Link
            to="/reservas"
            className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <span className="text-2xl mb-2 block">📅</span>
            <span className="text-gray-700 font-medium">Ver Reservas</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

