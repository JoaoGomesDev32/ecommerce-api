import pool from '../config/db.js';

export const addToCart = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`,
            [cart_id, product_id, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error); // <-- Adicione este log
        res.status(500).json({ error: 'Erro ao adicionar item ao carrinho.' });
    }
};

export const getCartItems = async (req, res) => {
    const { cart_id } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM cart_items WHERE cart_id = $1`,
            [cart_id]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens do carrinho.' });
    }
};

export const updateCartItem = async (req, res) => {
    const { item_id } = req.params;
    const { quantity } = req.body;

    try {
        const result = await pool.query(
            `UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *`,
            [quantity, item_id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item do carrinho.' });
    }
};

export const removeCartItem = async (req, res) => {
    const { item_id } = req.params;

    try {
        await pool.query(`DELETE FROM cart_items WHERE id = $1`, [item_id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item do carrinho.' });
    }
};