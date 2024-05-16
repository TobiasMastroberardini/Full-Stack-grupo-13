// Función para cargar los productos en oferta en el HTML
const cargarProductosEnOferta = function () {
    fetch('./datos/productos.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const productosEnOferta = datos.filter(producto => producto.en_oferta === true);
            cargarProductosHTML(productosEnOferta);
        });
}

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

// Función para filtrar productos por nombre
function filtrarProductosPorNombre(nombre) {
    const productosFiltrados = datos.filter(producto =>
        producto.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    cargarProductosHTML(productosFiltrados);
}

// Event listener para el input de filtrado
document.querySelector('#filtroNombre').addEventListener('input', function () {
    const nombre = this.value;
    filtrarProductosPorNombre(nombre);
});


export { cargarProductosEnOferta };

