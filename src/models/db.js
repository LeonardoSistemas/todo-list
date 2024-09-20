// src/models/db.js
const mysql = require('mysql2');

// Configurando a conexão com o banco de dados MySQL
const pool = mysql.createPool({
  host: process.env.host, // Endereço do servidor MySQL
  user: process.env.userbd, // Seu usuário do MySQL
  password: process.env.passwordbd, // Sua senha do MySQL
  database: process.env.bd // Nome do banco de dados que você vai usar
});

module.exports = pool.promise();
