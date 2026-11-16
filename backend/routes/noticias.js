const express = require('express');
const router = express.Router();
const Noticia = require('../models/Noticia');
const verificarAdmin = require('../middlewares/verificarAdmin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const carpetaUploads = path.resolve(process.cwd(), 'uploads');
fs.mkdirSync(carpetaUploads, { recursive: true });

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => cb(null, carpetaUploads),
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
    }
});
const subirImagen = multer({ storage: almacenamiento });

function crearSlug(texto) {
    return String(texto || 'noticia')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

router.get('/', async (req, res) => {
    try {
        const noticias = await Noticia.find().sort({ fecha: -1, _id: -1 });
        res.json(noticias);
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        res.status(500).json({ mensaje: 'Error al obtener las noticias' });
    }
});

router.post('/', verificarAdmin, subirImagen.single('imagen'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: 'Tenés que seleccionar una imagen.' });
        }
        const { categoria, titulo, descripcion, contenido = '' } = req.body;
        const baseSlug = crearSlug(titulo);
        const slug = `${baseSlug}-${Date.now()}`;
        const nuevaNoticia = new Noticia({
            categoria, titulo, descripcion, contenido,
            slug, origen: 'admin',
            imagen: `/uploads/${req.file.filename}`,
            enlace: `noticia.html?id=${slug}`
        });
        await nuevaNoticia.save();
        res.status(201).json({ mensaje: 'Noticia creada correctamente', noticia: nuevaNoticia });
    } catch (error) {
        console.error('Error al crear noticia:', error);
        res.status(500).json({ mensaje: 'Error al crear la noticia' });
    }
});

router.put('/:id', verificarAdmin, subirImagen.single('imagen'), async (req, res) => {
    try {
        const { categoria, titulo, descripcion, contenido } = req.body;
        const datosActualizados = { categoria, titulo, descripcion, contenido };
        if (req.file) datosActualizados.imagen = `/uploads/${req.file.filename}`;
        const noticiaActualizada = await Noticia.findByIdAndUpdate(
            req.params.id, datosActualizados,
            { new: true, runValidators: true }
        );
        if (!noticiaActualizada) return res.status(404).json({ mensaje: 'Noticia no encontrada' });
        res.json({ mensaje: 'Noticia actualizada correctamente', noticia: noticiaActualizada });
    } catch (error) {
        console.error('Error al actualizar noticia:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la noticia' });
    }
});

router.delete('/:id', verificarAdmin, async (req, res) => {
    try {
        const noticiaEliminada = await Noticia.findByIdAndDelete(req.params.id);
        if (!noticiaEliminada) return res.status(404).json({ mensaje: 'Noticia no encontrada' });
        res.json({ mensaje: 'Noticia eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar noticia:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la noticia' });
    }
});

module.exports = router;
