import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Rota para registrar um usuário
router.post('/register', userController.registerUser);

// Rota para login de usuário
router.post('/login', userController.loginUser);

export default router;