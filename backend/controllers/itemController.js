const ItemModel = require('../models/itemModel');

// GET /api/items - Listar todos os itens
const getAllItems = (req, res) => {
  try {
    const items = ItemModel.findAll();
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar itens',
      error: error.message
    });
  }
};

// GET /api/items/:id - Buscar item por ID
const getItemById = (req, res) => {
  try {
    const { id } = req.params;
    const item = ItemModel.findById(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar item',
      error: error.message
    });
  }
};

// POST /api/items - Criar novo item
const createItem = (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validação básica
    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Nome é obrigatório'
      });
    }
    
    const item = ItemModel.create({ name, description });
    
    res.status(201).json({
      success: true,
      message: 'Item criado com sucesso',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar item',
      error: error.message
    });
  }
};

// PUT /api/items/:id - Atualizar item
const updateItem = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const item = ItemModel.findById(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }
    
    const updatedItem = ItemModel.update(id, { name, description });
    
    res.json({
      success: true,
      message: 'Item atualizado com sucesso',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar item',
      error: error.message
    });
  }
};

// DELETE /api/items/:id - Deletar item
const deleteItem = (req, res) => {
  try {
    const { id } = req.params;
    
    const item = ItemModel.findById(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado'
      });
    }
    
    ItemModel.delete(id);
    
    res.json({
      success: true,
      message: 'Item deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar item',
      error: error.message
    });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};

