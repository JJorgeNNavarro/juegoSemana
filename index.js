document.addEventListener("DOMContentLoaded", function () {
  // Función para mezclar un arreglo
  function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Cargar el archivo JSON de preguntas
  fetch("base-preguntas.json")
    .then((response) => response.json())
    .then((data) => {
      // Seleccionar una pregunta aleatoria del JSON
      const pregunta = data[Math.floor(Math.random() * data.length)];

      // Crear un arreglo con todas las respuestas
      const respuestas = [
        { texto: pregunta.respuesta, correcta: true },
        { texto: pregunta.incorrecta1, correcta: false },
        { texto: pregunta.incorrecta2, correcta: false },
        { texto: pregunta.incorrecta3, correcta: false },
      ];

      // Mezclar el arreglo de respuestas
      const respuestasMezcladas = mezclarArreglo(respuestas);

      // Mostrar la pregunta en el HTML
      document.querySelector(".categoria").textContent = pregunta.categoria;
      document.querySelector(".pregunta").textContent =
        "Pregunta: " + pregunta.pregunta;

      // Mostrar las respuestas mezcladas en los botones
      respuestasMezcladas.forEach((respuesta, index) => {
        const boton = document.querySelector(`.btn#btn${index + 1}`);
        boton.textContent = respuesta.texto;
        boton.dataset.correcta = respuesta.correcta; // Guarda si la respuesta es correcta o no
      });

      // Mostrar la imagen en el HTML si existe
      const imagenElement = document.querySelector(".imagen");
      if (pregunta.imagen) {
        imagenElement.src = pregunta.imagen;
        imagenElement.style.display = "block"; // Asegúrate de mostrar la imagen si está presente
      } else {
        imagenElement.style.display = "none"; // Oculta la imagen si no hay una ruta proporcionada
      }
    })
    .catch((error) => console.error("Error al cargar las preguntas:", error));
});
