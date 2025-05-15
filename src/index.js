import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Rotas de usuários
app.use('/users', userRoutes);

// Rotas de produtos
app.use('/products', productRoutes);

// Rota do carrinho
app.use('/api', cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});