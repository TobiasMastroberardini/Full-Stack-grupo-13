// Función para cargar los datos del archivo JSON
const cargarDatos = function () {
    fetch('./datos/productos.json')
        .then(respuesta => respuesta.json())
        .then(datos => cargarProductosHTML(datos));
}

// Función para cargar los productos en el HTML
function cargarProductosHTML(datos) {
    const productosContainer = document.querySelector('.articulos');

    datos.forEach(function (producto) {
        const productoElement = document.createElement('article');

        const nombreElement = document.createElement('h3');
        nombreElement.className = 'bold';
        nombreElement.textContent = producto.nombre;

        const imagenesContainer = document.createElement('div');
        imagenesContainer.className = 'contImg';
        producto.imagen.forEach(function (imagen) {
            const imagenElement = document.createElement('img');
            imagenElement.src = imagen.ubicacion;
            imagenElement.alt = imagen.textoAlt;
            imagenElement.className = 'imgProducto'; // Ajusta esta clase según tu necesidad
            imagenesContainer.appendChild(imagenElement);
        });

        const descripcionElement = document.createElement('p');
        descripcionElement.textContent = producto.descripcion;

        const pesoElement = document.createElement('p');
        pesoElement.textContent = `Peso: ${producto.peso}`;

        const precioElement = document.createElement('p');
        precioElement.textContent = `Precio: ${producto.precio}`;

        productoElement.append(nombreElement, imagenesContainer, descripcionElement, pesoElement, precioElement);
        productosContainer.appendChild(productoElement);
    });
}

export { cargarDatos };

