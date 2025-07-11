const mysql = require('mysql2/promise');

// Criadno um pool de conexões com limite definido para evitar o erro "Too many connections"
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist',
  waitForConnections: true,
  connectionLimit: 10, // Limite de conexões simultâneas = 10
  queueLimit: 0 // É ilimitado na fila de espera
});

module.exports = pool;