require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 30000,
connectionTimeoutMillis: 2000,
});

// Testando a conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
  } else {
    console.log('Conexão bem-sucedida. Hora atual do PostgreSQL:', res.rows[0].now);
  }

  module.exports = {
  query: (text, params) => pool.query(text, params),
  // Pode exportar o pool diretamente se precisar de mais funcionalidades
  pool,
};
}
);