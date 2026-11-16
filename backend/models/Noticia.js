const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
    slug: { type: String, trim: true, index: true },
    origen: {
        type: String,
        enum: ['original', 'admin'],
        default: 'admin'
    },
    categoria: { type: String, required: true, trim: true },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    contenido: { type: String, default: '' },
    imagen: { type: String, required: true },
    enlace: { type: String, default: '#' },
    fecha: { type: Date, default: Date.now }
}, { timestamps: true });

noticiaSchema.index({ slug: 1 }, { unique: true, sparse: true });

const Noticia = mongoose.model('Noticia', noticiaSchema);
module.exports = Noticia;
