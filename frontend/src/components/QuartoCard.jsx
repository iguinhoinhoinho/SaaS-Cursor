const QuartoCard = ({ quarto, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{quarto.name}</h3>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
          Disponível
        </span>
      </div>

      {quarto.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">{quarto.description}</p>
      )}

      <div className="text-xs text-gray-500 mb-4">
        <p>Criado em: {new Date(quarto.createdAt).toLocaleDateString('pt-BR')}</p>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(quarto)}
          className="flex-1 bg-primary-100 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onDelete(quarto.id)}
          className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
        >
          🗑️ Deletar
        </button>
      </div>
    </div>
  )
}

export default QuartoCard

