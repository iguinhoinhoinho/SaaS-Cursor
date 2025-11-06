const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rotas
const itemRoutes = require('./routes/itemRoutes');

// Rotas
app.use('/api/items', itemRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API CRUD funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

