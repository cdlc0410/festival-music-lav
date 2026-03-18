console.log('App Lista');

// Esperando que el DOM este cargado
document.addEventListener('DOMContentLoaded', () => {

    // Navegacion Fija en Escritorio
    navbarFixed();
    // Resaltar los Enlaces durante el scroll
    resaltarEnlace();
    // Animacion del Scroll al hacer click en los enlaces
    scrollNav();
    // Cargando Galeria
    crearGaleria();

});

function navbarFixed() {
    // Obtener Header
    const header = document.querySelector('.header');
    // Obtener Sobre Festival
    const sobreFestival = document.querySelector('.festival');

    // escuchar por el evento de scroll
    window.addEventListener('scroll', () => {
        if ( sobreFestival.getBoundingClientRect().bottom < 1 ) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    });
};

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

function mostrarImg(i) {

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

function resaltarEnlace() {
    document.addEventListener('scroll', () => {

        // obtener secciones de la pagina
        const sections = document.querySelectorAll('section');
        // obtener links de navegacion
        const navLinks = document.querySelectorAll('.nav a');

        let actual = '';

        // accediendo a sections
        sections.forEach( section => {

            // distancia del elemento padre
            const sectionTop = section.offsetTop;
            // tamaño del elemento
            const sectionHeigth = section.clientHeight;

            // operacion para definir que elemento tiene mas pixeles en pantalla
            if (window.scrollY >= (sectionTop - sectionHeigth / 3)) {
                actual = section.id;
            };
        });

        // accediendo a navLinks
        navLinks.forEach( link => {

            // verificando si el href es igual a la posicion actual
            if (link.getAttribute('href') === `#${actual}`) {
                // agregando clase modificadora de enlace
                link.classList.add('active');
            } else {
                // eliminando la clase modificadora
                link.classList.remove('active');
            }
        });

    });
};

function scrollNav() {

    // obteniendo los enlaces
    const navLinks = document.querySelectorAll('.nav a');

    //
    navLinks.forEach( link => {
        link.addEventListener('click', e => {

            // deshabilitar el comportamiento
            e.preventDefault();

            // seccion a Scrollear
            const sectionScroll = e.target.getAttribute('href');

            // obteniendo la seccion
            const section = document.querySelector(sectionScroll);

            console.log(section)
            // haciendo el scroll
            section.scrollIntoView({behavior: 'smooth'});
        });
    });
};