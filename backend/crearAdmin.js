
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Administrador = require('./models/Administrador');

async function crearAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'gta6'
        });

        console.log('Conectado a MongoDB');

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error('Faltan ADMIN_EMAIL o ADMIN_PASSWORD en el archivo .env');
        }

        const existe = await Administrador.findOne({ email });

        const passwordEncriptada = await bcrypt.hash(password, 10);

        if (existe) {
            existe.password = passwordEncriptada;
            await existe.save();

            console.log('Contraseña del administrador actualizada.');
            return;
        }

        const nuevoAdmin = new Administrador({
            email,
            password: passwordEncriptada
        });

        await nuevoAdmin.save();

        console.log('Administrador creado correctamente.');
    } catch (error) {
        console.error('Error al crear administrador:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

crearAdmin();
