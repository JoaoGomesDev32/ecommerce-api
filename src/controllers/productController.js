import pool from '../config/db.js';

export const createProduct = async (req, res) => {
  const { name, description, price, image_url, category } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, image_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, image_url, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, category = $5 WHERE id = $6 RETURNING *',
      [name, description, price, image_url, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
};
