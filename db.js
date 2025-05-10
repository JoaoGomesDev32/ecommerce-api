// db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',          // Ex: postgres
  host: 'localhost',
  database: 'ecommerce',        // Nome do banco criado
  password: '050122',        // Senha do PostgreSQL
  port: 5432,                   // Porta padrão do PostgreSQL
});

export default pool;
