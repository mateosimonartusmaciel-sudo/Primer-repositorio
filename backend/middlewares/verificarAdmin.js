function verificarAdmin(req, res, next) {

    if (!req.session.administradorId) {
        return res.status(401).json({
            mensaje: 'Acceso denegado. Debes iniciar sesión.'
        });
    }

    next();
}

module.exports = verificarAdmin;