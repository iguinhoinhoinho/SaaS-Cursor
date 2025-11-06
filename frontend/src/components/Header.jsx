import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              🏨 SaaS Glen Hotel
            </Link>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/')
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/quartos"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/quartos')
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Quartos
              </Link>
              <Link
                to="/reservas"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/reservas')
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Reservas
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

