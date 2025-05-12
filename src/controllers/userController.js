import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o e-mail já existe
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insere novo usuário
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      console.log('Usuário não encontrado para o e-mail:', email);
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });
    }

    // Verifica a senha
    console.log('Senha fornecida:', password);
    console.log('Hash armazenado:', user.rows[0].password_hash);

    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!isMatch) {
      console.log('Senha inválida para o e-mail:', email);
      return res.status(400).json({ message: 'E-mail ou senha inválidos' });
    }

    // Tudo certo, retorna o usuário
    res.status(200).json({ message: 'Login bem-sucedido', user: user.rows[0] });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export default { registerUser, loginUser };