import { mostrarHash } from "./componentes/ruteo.js";
// ********** SPA **********
// Seteo contenido por defecto al cargar el sitio
window.addEventListener("DOMContentLoaded", evento => mostrarHash());

// Si cambia el hash, cambia el contenido
window.addEventListener("hashchange", evento => mostrarHash());
