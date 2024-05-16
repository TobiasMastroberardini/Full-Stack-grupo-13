import { cargarProductosHTML } from "./cargarProductos.js";

// Función para cargar los datos del archivo JSON
const cargarDatos = function () {
    fetch('./datos/productos.json')
        .then(respuesta => respuesta.json())
        .then(datos => cargarProductosHTML(datos));
}

cargarProductosHTML();

export { cargarDatos };

