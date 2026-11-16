const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const mongoose = require('mongoose');

const Contacto = require('./models/Contacto');
const administradoresRoutes = require('./routes/administradores');
const noticiasRoutes = require('./routes/noticias');

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 2
    }
}));

app.use('/api/administradores', administradoresRoutes);
app.use('/api/noticias', noticiasRoutes);
const PORT = 3001;

app.get('/api/estado', (req, res) => {
    res.json({
        mensaje: 'Backend de GTA 6 funcionando correctamente'
    });
});

app.post('/api/contacto', async (req, res) => {

    try {

        const { nombre, email, mensaje } = req.body;

        const nuevoContacto = new Contacto({
            nombre,
            email,
            mensaje
        });

        await nuevoContacto.save();

        res.status(201).json({
            mensaje: 'Contacto guardado correctamente'
        });

    } catch (error) {

        console.error('Error al guardar el contacto:', error);

        res.status(500).json({
            mensaje: 'Error al guardar el contacto'
        });

    }

});

mongoose.connect(process.env.MONGO_URI, {
    dbName: 'gta6'
})
    .then(() => {
        console.log('MongoDB conectado correctamente');

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar MongoDB:', error);
    });