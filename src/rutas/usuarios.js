import { createUsuario, loginUsuario } from '../servicios/usuarios.js';

export function usuarioRoutes (app) {
    
    // Ruta para Registro (Signup) - Punto 4.1 de la rúbrica
    app.post('/api/v1/usuario/signup', async (req, res) => {
        try {
            const usuario = await createUsuario(req.body);
            return res.status(201).json({ username: usuario.username });
        } catch (err) {
            return res.status(400).json({
                error: 'Falló al crear el usuario, ¿El usuario ya existe?',
            });
        }
    });

    // Ruta para Inicio de Sesión (Login) - Punto 4.1 de la rúbrica
    app.post('/api/v1/usuario/login', async (req, res) => {
        try {
            const token = await loginUsuario(req.body);
            return res.status(200).send({ token });
        } catch (err) {
            return res.status(400).send({
                error: 'Login Falló, ¿Ingresaste el Usuario/Contraseña correcta?',
            });
        }
    });
}