const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'admin'
    }
});

const Administrador = mongoose.model('Administrador', administradorSchema);

module.exports = Administrador;