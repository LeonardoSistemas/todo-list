// server.js
const express = require('express');
const cors = require('cors');
const tarefasRoutes = require('./src/routes/tarefasRoutes');

const app = express();

// Middleware para habilitar CORS e permitir JSON no corpo das requisições
app.use(cors());
app.use(express.json());

// Usando as rotas para tarefas
app.use('/api/tarefas', tarefasRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
