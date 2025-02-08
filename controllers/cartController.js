import Cart from './../models/cart.js'
import mongoose from 'mongoose';
import Product from '../models/product.js'; // ✅ Import the Product model

// Get cart details
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid productId format" });
        }

        // Check if the product exists in the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Check if product already exists in cart
        const existingItem = cart.items.find(item => item.productId.equals(productObjectId));

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId: productObjectId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: 'Cart cleared', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
