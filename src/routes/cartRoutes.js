import express from 'express';
import {
    addToCart,
    getCartItems,
    updateCartItem,
    removeCartItem,
} from '../controllers/cartController.js';

const router = express.Router();

router.post('/items', addToCart);
router.get('/items/:cart_id', getCartItems);
router.put('/items/:item_id', updateCartItem);
router.delete('/items/:item_id', removeCartItem);

export default router;