import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose'; // Nuevo: Para la base de datos 
import dotenv from 'dotenv'; // Nuevo: Para leer el archivo .env 
import { usuarioRoutes } from './src/rutas/usuarios.js'; // Nuevo: Importar rutas JWT [cite: 282]

dotenv.config(); // Carga la variable JWT_SECRET del .env 

const app = express();
app.use(express.json());
app.use(helmet()); 
app.use(cors({ origin: 'http://localhost:5173' }));

// 1. Integrar las rutas de usuario (Signup y Login)
usuarioRoutes(app); // [cite: 283, 284]

// 2. Tu ruta de comentarios anterior
app.post('/comentarios', (req, res) => {
  const { texto } = req.body;
  res.json({ comentario: texto });
});

// 3. Conexión a MongoDB y encendido del servidor
// Asegúrate de tener MongoDB Compass abierto y conectado
mongoose.connect('mongodb://127.0.0.1:27017/seguridad_utng')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(3000, () => console.log('🚀 Servidor corriendo en http://localhost:3000'));
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));