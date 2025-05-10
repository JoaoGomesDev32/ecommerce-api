import express from 'express';
import dotenv from 'dotenv';

// Importando o módulo dotenv para carregar variáveis de ambiente
dotenv.config(); // Carregando as variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());


//Rota de teste
app.get('/', (req, res) => {
  res.send('🚀 API de E-commerce está no ar!');
});

// Teste de conexão com o banco de dados
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar ao banco', details: err });
  }
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});