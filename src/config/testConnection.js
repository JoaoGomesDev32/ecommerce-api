// testConnection.js
import pool from './db.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conectado ao banco:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err);
  } finally {
    pool.end();
  }
})();
