const formularioLogin = document.getElementById('formularioLogin');
const mensajeLogin = document.getElementById('mensajeLogin');
const btnLogin = document.getElementById('btnLogin');

formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    mensajeLogin.textContent = '';
    btnLogin.disabled = true;
    btnLogin.textContent = 'VERIFICANDO...';

    try {
        const respuesta = await fetch('http://localhost:3001/api/administradores/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.mensaje || 'No se pudo iniciar sesión.');
        }

        window.location.href = 'panel.html';

    } catch (error) {
        mensajeLogin.textContent = error.message;
        btnLogin.disabled = false;
        btnLogin.textContent = 'INICIAR SESIÓN';
    }
});