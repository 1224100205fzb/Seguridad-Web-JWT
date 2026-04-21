import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../bd/modelos/usuario.js';

// Punto 3.1: Hash de contraseña [cite: 46, 184]
export async function createUsuario({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const usuario = new Usuario({ username, password: hashedPassword });
  return await usuario.save();
}

// Punto 3.2 y 3.3: Login y generación de Token [cite: 48, 55, 184]
export async function loginUsuario({ username, password }) {
  const usuario = await Usuario.findOne({ username });
  if (!usuario) throw new Error('Nombre de Usuario Incorrecto!');

  const isPasswordCorrect = await bcrypt.compare(password, usuario.password);
  if (!isPasswordCorrect) throw new Error('Contraseña invalida!');

  const token = jwt.sign({ sub: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
}