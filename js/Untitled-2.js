// BOTÓN DE SUSCRIPCIÓN

const boton = document.querySelector('#botonSuscripcion');

console.log(boton);

boton.addEventListener('click', function(event) {

    console.log(event.target);
    console.log(event.type);

    alert('Hola, bienvenido a la página de noticias de GTA VI');
});

// FORMULARIO DE SUSCRIPCIÓN

const formulario = document.querySelector('#formularioSuscripcion');

formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;

    console.log('Nombre:', nombre);
    console.log('Email:', email);

    alert('¡Gracias por suscribirte!');
});


// FORMULARIO DE CONTACTO

const formularioContacto = document.querySelector('#formularioContacto');

formularioContacto.addEventListener('submit', function(event) {

    event.preventDefault();

    const nombre = document.querySelector('#nombreContacto').value;
    const email = document.querySelector('#emailContacto').value;
    const mensaje = document.querySelector('#mensaje').value;

    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:', mensaje);

    alert('Mensaje enviado correctamente');
});

// CONTADOR GTA VI

const fechaLanzamiento = new Date('November 19, 2026 00:00:00');

function actualizarContador() {

    const fechaActual = new Date();

    const diferencia = fechaLanzamiento - fechaActual;

    if (diferencia <= 0) {

        document.querySelector('#dias').textContent = 0;
        document.querySelector('#horas').textContent = 0;
        document.querySelector('#minutos').textContent = 0;
        document.querySelector('#segundos').textContent = 0;

        console.log('¡GTA VI ya está disponible!');

    } else {

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

        const horas = Math.floor(
            diferencia / (1000 * 60 * 60) % 24
        );

        const minutos = Math.floor(
            diferencia / (1000 * 60) % 60
        );

        const segundos = Math.floor(
            diferencia / 1000 % 60
        );

        document.querySelector('#dias').textContent = dias;
        document.querySelector('#horas').textContent = horas;
        document.querySelector('#minutos').textContent = minutos;
        document.querySelector('#segundos').textContent = segundos;
    }
}

actualizarContador();

setInterval(actualizarContador, 1000);