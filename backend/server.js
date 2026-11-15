const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');

const Contacto = require('./models/Contacto');

const app = express();

app.use(express.json());

const PORT = 3000;

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