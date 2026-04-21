import mongoose, { Schema } from 'mongoose';

// Punto 2.1: Esquema con username único [cite: 36, 184]
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const Usuario = mongoose.model('usuario', userSchema);