import { cargarDatos } from "./productos.js";

const sitio = {
    productos: ['./sitio/productos.html', cargarDatos],
    ofertas: ['./sitio/ofertas.html',],
    contacto: ['./sitio/contacto.html',],
    404: ['./sitio/404.html']
}

function cambiarSeccion(seccion) {
    let seccionDinamica = document.querySelector('#contenidoSPA');
    fetch(`${seccion}`)
        .then(respuesta => respuesta.text())
        .then(datos => seccionDinamica.innerHTML = datos);
}

function mostrarHash() {
    let hashActual = window.location.hash;
    if (hashActual.length == 0) {
        hashActual = "#productos";
    }

    let ruta = sitio[404];
    let destino = hashActual.substring(1,);
    if (destino in sitio) {
        ruta = sitio[destino];
    }

    cambiarSeccion(ruta[0]);

    if (ruta[1]) {
        setTimeout(ruta[1], 500);
    }
}

export { mostrarHash };
