const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const Administrador = require('../models/Administrador');


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al administrador por su correo
        const administrador = await Administrador.findOne({ email });

        if (!administrador) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Comparar la contraseña ingresada con el hash guardado
        const passwordCorrecta = await bcrypt.compare(
            password,
            administrador.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        // Crear la sesión del administrador
        req.session.administradorId = administrador._id;

        res.json({
            mensaje: 'Inicio de sesión correcto'
        });

    } catch (error) {
        console.error('Error en el login:', error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
});

// Comprobar si hay un administrador con sesión activa
router.get('/sesion', (req, res) => {
    if (!req.session.administradorId) {
        return res.status(401).json({
            autenticado: false,
            mensaje: 'No hay una sesión activa'
        });
    }

    res.json({
        autenticado: true,
        mensaje: 'Administrador autenticado'
    });
});

// Cerrar la sesión del administrador
router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({
                mensaje: 'Error al cerrar la sesión'
            });
        }

        res.clearCookie('connect.sid');

        res.json({
            mensaje: 'Sesión cerrada correctamente'
        });
    });
});

module.exports = router;


