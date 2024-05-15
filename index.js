document.addEventListener("DOMContentLoaded", function () {
  // Cargar el archivo JSON de preguntas
  fetch("base-preguntas.json")
    .then((response) => response.json())
    .then((data) => {
      // Seleccionar una pregunta aleatoria del JSON
      const pregunta = data[Math.floor(Math.random() * data.length)];

      // Mostrar la pregunta en el HTML
      document.querySelector(".categoria").textContent = pregunta.categoria;
      document.querySelector(".pregunta").textContent =
        "Pregunta: " + pregunta.pregunta;
      document.querySelector(".btn#btn1").textContent = pregunta.respuesta;
      document.querySelector(".btn#btn2").textContent = pregunta.incorrecta1;
      document.querySelector(".btn#btn3").textContent = pregunta.incorrecta2;
      document.querySelector(".btn#btn4").textContent = pregunta.incorrecta3;

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
