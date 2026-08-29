let titulo = document.querySelector('h1');
console.log(titulo);
console.log(titulo.textContent);

titulo.textContent = 'Noticias GTA VI';
titulo.style.color = 'violet';

const boton = document.querySelector('button')
console.log(boton);

boton.addEventListener('click', function(event) {
    console.log('event.target');
    console.log(event.type);
    alert('Hola, bienvenido a la página de noticias de GTA VI');
});

const formulario = document.querySelector('#miFormulario');
const input = document.querySelector('#miInput');
const lista = document.querySelector('#miLista');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    let texto = input.value.trim();
    if (texto === '') {
        alert('Por favor, ingresa un texto válido.');
        return;
    } else {
        console.log('Texto ingresado:', texto);
        
        const item = document.createElement('li');
        item.addEventListener('click', function(event) {
            item.classList.toggle('completado');
        });
        
        item.textContent = texto;
        lista.appendChild(item);
        input.value = '';
    }
});
