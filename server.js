const express = require('express');
const cors = require('cors');
const tarefasRoutes = require('./src/routes/tarefasRoutes');
const path = require('path');

const app = express();

// Middleware para habilitar CORS e permitir JSON no corpo das requisições
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

// Usando as rotas para tarefas
app.use('/api/tarefas', tarefasRoutes);

app.use('/', (req, res) =>{
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
