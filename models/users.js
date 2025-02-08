
import mongoose, { mongo } from 'mongoose';

// const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', unique: true }
});

const User = mongoose.model('User', UserSchema);
export default User;
