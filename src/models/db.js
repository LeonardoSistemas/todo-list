const mysql = require('mysql2');
// Configurando a conexão com o banco de dados MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário MySQL
  password: 'lct147', // Substitua pela sua senha MySQL
  database: 'todo_list'
});

module.exports = pool.promise();
