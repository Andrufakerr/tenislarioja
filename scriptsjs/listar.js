import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Ya tenés window.db desde tu conexión
const contenedor = document.getElementById("tablasPorCategoria");

// ORDEN EXACTO QUE QUERÉS
const ordenCategorias = [
  { value: "1ra", titulo: "1ra Categoría" },
  { value: "2nda", titulo: "2nda Categoría" },
  { value: "3ra", titulo: "3ra Categoría" },
  { value: "4ta", titulo: "4ta Categoría" },
  { value: "femenino", titulo: "Femenino" }
];

async function cargarTurnos() {
  const querySnapshot = await getDocs(collection(window.db, "participantes"));

  // Agrupar por categoría
  const categorias = {};

  querySnapshot.forEach((doc) => {
    const dato = doc.data();
    const categoria = dato.categoria;

    if (!categorias[categoria]) {
      categorias[categoria] = [];
    }

    categorias[categoria].push(dato);
  });

  // Limpiar contenedor
  contenedor.innerHTML = "";

  // Recorrer en el ORDEN exacto
  ordenCategorias.forEach(cat => {
    const lista = categorias[cat.value] || [];

    const tabla = document.createElement("table");
    tabla.classList.add("tabla-turnos");

    tabla.innerHTML = `
      <thead>
        <tr>
          <th colspan="3" class="titulo-categoria">${cat.titulo}</th>
        </tr>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        ${
          lista.length > 0
            ? lista.map(p => `
              <tr>
                <td>${p.nombre}</td>
                <td>${p.apellido}</td>
                <td>${p.telefono}</td>
              </tr>
            `).join("")
            : `
              <tr>
                <td colspan="3" style="text-align:center; opacity:0.6;">Sin inscriptos</td>
              </tr>
            `
        }
      </tbody>
    `;

    contenedor.appendChild(tabla);

    // Espacio entre categorías para imprimir
    const espacio = document.createElement("br");
    contenedor.appendChild(espacio);
  });
}

// Ejecutar al cargar la página
cargarTurnos();

