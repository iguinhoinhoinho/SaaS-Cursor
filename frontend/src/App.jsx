import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Quartos from './pages/Quartos'
import Reservas from './pages/Reservas'
import Cadastro from './pages/Cadastro'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

