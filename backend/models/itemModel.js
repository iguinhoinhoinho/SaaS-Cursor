// Modelo de dados em memória (substitua por banco de dados real)
let items = [];
let nextId = 1;

class Item {
  constructor(data) {
    this.id = nextId++;
    this.name = data.name;
    this.description = data.description || '';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    this.name = data.name || this.name;
    this.description = data.description !== undefined ? data.description : this.description;
    this.updatedAt = new Date().toISOString();
  }
}

// Funções do modelo
const ItemModel = {
  findAll: () => items,
  
  findById: (id) => items.find(item => item.id === parseInt(id)),
  
  create: (data) => {
    const item = new Item(data);
    items.push(item);
    return item;
  },
  
  update: (id, data) => {
    const item = ItemModel.findById(id);
    if (item) {
      item.update(data);
      return item;
    }
    return null;
  },
  
  delete: (id) => {
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      return items.splice(index, 1)[0];
    }
    return null;
  }
};

module.exports = ItemModel;

