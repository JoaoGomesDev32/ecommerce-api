// testConnection.js
import pool from './db.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexão bem-sucedida!', res.rows);
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
  } finally {
    await pool.end();
  }
})();
