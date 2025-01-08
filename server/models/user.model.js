import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    isAdmin: { type: Boolean, default: false }, // New field for admin status
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
