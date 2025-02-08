import User from './../models/users.js';
import Cart from './../models/cart.js';
// const User = require('../models/user');
// const Cart = require('../models/cart');

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();

        // Create an empty cart for the user
        const cart = new Cart({ user: user._id, items: [] });
        await cart.save();

        // Link cart to user
        user.cart = cart._id;
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user details along with cart
export const getUserWithCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('cart');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user details
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user and their cart
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await Cart.findOneAndDelete({ user: user._id }); // Remove user's cart
        await User.findByIdAndDelete(req.params.id); // Remove user

        res.status(200).json({ message: 'User and associated cart deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
