// modal.js

// Asumimos que `db`, `collection`, `addDoc` están disponibles globalmente via window.db, etc.
// Si usas módulos, importarías directamente:
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// const db = getFirestore(app); // 'app' también necesitaría ser importada o accesible

document.getElementById("btnNuevoTurno").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("modalTurno").classList.add("active");
});

document.getElementById("btnCancelar").addEventListener("click", function () {
  document.getElementById("modalTurno").classList.remove("active");
});

window.addEventListener("click", function(e) {
  const modal = document.getElementById("modalTurno");
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// Guardar formulario y enviar a Firestore
document.getElementById("formTurno").addEventListener("submit", async function(e) {
  e.preventDefault();

  // 1. Obtener los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const categoria = document.getElementById("especie").value; // Cambié el id a 'especie' para que coincida con tu HTML
  const dni = document.getElementById("dni").value;
  const telefono = document.getElementById("telefono").value;

  // 2. Crear un objeto con los datos del participante
  const nuevoParticipante = {
    nombre: nombre,
    apellido: apellido,
    categoria: categoria,
    dni: dni,
    telefono: telefono,
    fechaRegistro: new Date() // Opcional: añadir una marca de tiempo
  };

  // 3. Enviar los datos a Cloud Firestore
  try {
  const docRef = await addDoc(
    collection(window.db, "participantes"),
    nuevoParticipante
  );

  // Ocultar modal anterior del formulario
  document.getElementById("modalTurno").classList.remove("active");

  // Mostrar modal de confirmación
  const modalConfirmacion = document.getElementById("modalConfirmacion");
  modalConfirmacion.classList.add("active");

  // Botón para inscribir otro
  document.getElementById("btnOtroTurno").addEventListener("click", () => {
    modalConfirmacion.classList.remove("active"); 
    document.getElementById("formTurno").reset();
    document.getElementById("modalTurno").classList.add("active"); 
  });

  // Botón para cerrar modal
  document.getElementById("btnImprimir").addEventListener("click", () => {
    modalConfirmacion.classList.remove("active");
  });

} catch (error) {
  console.error("Error al guardar:", error);
}

});
