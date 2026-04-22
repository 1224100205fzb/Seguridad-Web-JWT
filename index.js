import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import xss from 'xss-clean';

const app = express(); // <--- ESTO ES LO QUE TE FALTABA
app.use(express.json());
app.use(helmet()); 
app.use(cors());

// 1.1 Rate Limiting: Máximo 10 peticiones por minuto [cite: 200, 234]
const limitador = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 10, 
  message: { error: 'Demasiadas peticiones, intenta más tarde (429)' }
});

// Aplicar el limitador a la ruta específica [cite: 198]
app.use('/api/v1/comentarios', limitador);

// 1.2 Sanitización contra XSS [cite: 201, 234]
app.use(xss()); 

// 1.3 Validación de datos y Ruta POST [cite: 202, 234]
app.post('/api/v1/comentarios', [
  body('puntuacion').isInt().withMessage('La puntuación debe ser un número entero'),
  body('texto').isLength({ max: 200 }).withMessage('El texto no puede superar los 200 caracteres')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { texto, puntuacion } = req.body;
  res.json({ mensaje: "Comentario recibido de forma segura", texto, puntuacion });
});

app.listen(3000, () => console.log('🚀 Backend seguro en puerto 3000'));