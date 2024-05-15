// Función para cargar los productos en oferta en el HTML
function cargarProductosEnOfertaHTML(datos) {
    const productosContainer = document.querySelector('.articulos');

    // Filtrar los productos que están en oferta
    const productosEnOferta = datos.filter(producto => producto.en_oferta);

    productosEnOferta.forEach(function (producto) {
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

        const enOfertaElement = document.createElement('p');
        enOfertaElement.textContent = `En oferta: ${producto.en_oferta ? 'Sí' : 'No'}`;

        productoElement.append(nombreElement, imagenesContainer, descripcionElement, pesoElement, precioElement, enOfertaElement);
        productosContainer.appendChild(productoElement);
    });
}

export { cargarProductosEnOfertaHTML };
