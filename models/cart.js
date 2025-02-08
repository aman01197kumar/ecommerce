
import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }]
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;