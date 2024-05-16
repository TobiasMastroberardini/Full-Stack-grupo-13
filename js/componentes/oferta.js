import { cargarProductosHTML } from "./cargarProductos.js";

// Función para cargar los productos en oferta en el HTML
const cargarProductosEnOferta = function () {
    fetch('./datos/productos.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const productosEnOferta = datos.filter(producto => producto.en_oferta === true);
            cargarProductosHTML(productosEnOferta);
        });
}

cargarProductosHTML();

export { cargarProductosEnOferta };

