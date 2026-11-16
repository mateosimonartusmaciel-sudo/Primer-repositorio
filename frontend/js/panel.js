
// Comprobamos si el administrador tiene una sesión activa.
async function verificarSesion() {
    try {
        const respuesta = await fetch(
            'http://localhost:3001/api/administradores/sesion',
            {
                credentials: 'include'
            }
        );

        if (!respuesta.ok) {
            window.location.href = 'login.html';
            return false;
        }

        return true;

    } catch (error) {
        console.error('Error al verificar la sesión:', error);
        document.getElementById('listaNoticias').textContent =
            'No se pudo conectar con el servidor.';

        return false;
    }
}


// Buscamos las noticias guardadas en MongoDB.
async function cargarNoticias() {
    const listaNoticias = document.getElementById('listaNoticias');

    try {
        const respuesta = await fetch(
            'http://localhost:3001/api/noticias',
            {
                credentials: 'include'
            }
        );

        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar las noticias.');
        }

        const noticias = await respuesta.json();

        if (noticias.length === 0) {
            listaNoticias.textContent = 'Todavía no hay noticias publicadas.';
            return;
        }

        listaNoticias.textContent =
            `Se encontraron ${noticias.length} noticias.`;

    } catch (error) {
        console.error(error);
        listaNoticias.textContent = error.message;
    }
}


// Iniciamos el panel.
async function iniciarPanel() {
    const sesionActiva = await verificarSesion();

    if (sesionActiva) {
        await cargarNoticias();
    }
}

iniciarPanel();
