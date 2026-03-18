console.log('App Lista')

// Esperando que el DOM este cargado
document.addEventListener('DOMContentLoaded', () => {

    // Cargando Galeria
    crearGaleria();

})

function crearGaleria() {
    
    // Cantidad de Imagenes en folder
    const CANT_IMG = 16;

    // Obteniendo la clase
    const galeria = document.querySelector('.galeria__imgs');

    for( let i = 1; i <= CANT_IMG; i++ ) {

        // Generar imagen
        const imagen = document.createElement('IMG');

        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen Galeria ${i}`;

        // Event Handler

        imagen.onclick = () => {
            mostrarImg( i );
        }

        // Agregando Imagen a Galeria
        galeria.appendChild(imagen)
    };
};

function mostrarImg( i ) {

    // Generar imagen
    const imagen = document.createElement('IMG');

        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen Galeria ${i}`;

    // Generar Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');

    // Boton para Cerrar Modal
    const cerrarBtn = document.createElement('BUTTON');
    cerrarBtn.classList.add('btn-cerrar');
    cerrarBtn.textContent = 'X';
    cerrarBtn.onclick = cerrarModal;

    // Event Handler
    modal.onclick = cerrarModal;

    // Agregando al Modal
    modal.appendChild(imagen); // se agrega imagen al modal
    modal.appendChild(cerrarBtn);

    // Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden'); // evita el scroll
    body.appendChild(modal); // se agrega modal al body
};

function cerrarModal() {

    // Obteniendo Modal
    const modal = document.querySelector('.modal');
    // Animacion de Cierre
    modal.classList.add('fade-out')
    setTimeout(() => {

        modal?.remove(); // Si existe, se borra

        // Obeteniendo body
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden'); // devuelve el scroll
    }, 500)
    
};